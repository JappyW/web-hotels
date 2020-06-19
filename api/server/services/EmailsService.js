const nodemailer = require("nodemailer")
const WEBUIEMAIL = "webuihotelsearch@gmail.com"
const STANDARDHTML = "<h2>The email builder was used incorrectly</h2>"
const GMAIL = "gmail"

class Email {
  constructor(build) {
    this.sender = build.sender
    this.receiver = build.receiver
    this.link = build.link
    this.subject = build.subject
  }

  static get Builder() {
    class Builder {
      constructor(sender) {
        this.sender = sender
      }
      setReceiver(receiver) {
        this.receiver = receiver
        return this
      }
      setHTML(html) {
        this.html = html
        return this
      }
      setSubject(subject) {
        this.subject = subject
        return this
      }
      async createMailOptions(from, to, subject, html) {
        return {
          from,
          to,
          subject,
          html
        }
      }
      async build() {
        if (!this.sender) {
          this.sender = WEBUIEMAIL
        }

        if (!this.receiver && !this.html) {
          this.receiver = WEBUIEMAIL
          this.html = STANDARDHTML
        }
        const mailOptions = await this.createMailOptions(
          this.sender,
          this.receiver,
          this.subject,
          this.html
        )
        const transporter = nodemailer.createTransport({
          service: GMAIL,
          auth: {
            user: "webuihotelsearch@gmail.com",
            pass: "qwertypass321"
          }
        })
        transporter.sendMail(mailOptions, function(err, info) {
          if (err){
            console.error(err)
          }
          else {
            console.log(info)
          }
        })
        return new Email(this)
      }
    }
    return Builder
  }
}
export default Email
