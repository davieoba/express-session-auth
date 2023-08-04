const { Resend } = require("resend")
const { resetpasswordTemplate } = require("./password-template")
const { RESEND_API } = require('../config')

class Email {
  constructor() {
    this.resend = new Resend(RESEND_API)
    this.admin = 'Sage-Auth@resend.dev'
  }

  async resetpasswordEmail(resetLink, user, subject, client) {

    try {
      const data = await this.resend.emails.send({
        from: this.admin,
        to: client,
        subject: subject,
        html: resetpasswordTemplate(resetLink, user)
      })
      return data

    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Email