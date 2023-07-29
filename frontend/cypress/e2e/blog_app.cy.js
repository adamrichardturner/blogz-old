describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const userOne = {
      name: 'Adam Turner',
      username: 'aturner',
      password: 'Matrix88',
    }
    const userTwo = {
      name: 'John Smith',
      username: 'jsmith',
      password: 'Test123',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userOne)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userTwo)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aturner')
      cy.get('#password').type('Matrix88')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('atooona')
      cy.get('#password').type('Mapbox88')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aturner', password: 'Matrix88' })
      cy.createBlog({
        title: 'Weeping Hearts',
        author: 'John Smith',
        url: 'www.google.com',
      })
      cy.createBlog({
        title: 'Weeping Parts',
        author: 'John Tiff',
        url: 'www.gooas.com',
      })
      cy.createBlog({
        title: 'Weeping Hearst',
        author: 'John Biff',
        url: 'www.googew.com',
      })
    })

    it('A blog can be created', function () {
      cy.get('.toggle-button').click()
      cy.get('#title').type('A test blog')
      cy.get('#author').type('Edgar Allan Poe')
      cy.get('#url').type('www.example.com')
      cy.get('#add-blog').click()
      cy.visit('')
      cy.contains('A test blog')
    })

    it('A blog can be liked', function () {
      cy.get('#toggle-details').click()
      cy.get('#add-like').click()
      cy.contains('likes 1')
    })

    it('The user who created the blog can delete it', function () {
      cy.contains('Weeping Hearts')
        .parent()
        .find('button')
        .contains('remove')
        .click()
      cy.get('.notification')
        .should('contain', 'Blog Weeping Hearts by John Smith deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('Only the user who created the blog can see the remove button', function () {
      cy.contains('Weeping Hearts').parent().find('button').contains('remove')
      cy.login({ username: 'jsmith', password: 'Test123' })
      cy.contains('Weeping Hearts')
        .parent()
        .find('button')
        .contains('remove')
        .should('not.exist')
    })

    it('blogs are ordered by number of likes', function () {
      cy.get('.blog').eq(0).find('button').contains('view').click()
      cy.get('.blog').eq(0).find('button').contains('like').click()
      cy.get('.blog').eq(0).find('button').contains('like').click()

      cy.get('.blog').eq(1).find('button').contains('view').click()
      cy.get('.blog').eq(1).find('button').contains('like').click()

      cy.get('.blog').eq(2).find('button').contains('view').click()
      cy.get('.blog').eq(2).find('button').contains('like').click()
      cy.get('.blog').eq(2).find('button').contains('like').click()
      cy.get('.blog').eq(2).find('button').contains('like').click()

      cy.visit('')

      cy.get('.blog').eq(0).should('contain', 'Weeping Hearst')
      cy.get('.blog').eq(1).should('contain', 'Weeping Hearts')
      cy.get('.blog').eq(2).should('contain', 'Weeping Parts')
    })
  })
})
