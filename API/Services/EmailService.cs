using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class EmailService
    {
        private string companyName = "PawMatch";
        private string senderEmail = "gnulitskaya@mail.ru";
        private string password = "aw6DfjDvK3AGy6a1QPff"; 
        public void SendCode(string from, string to, string subject, string body)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress(from, companyName);
                message.To.Add(new MailAddress(to));
                message.Subject = subject;
                message.Body = EmailBody.GetBody("Добрый день!", body);
                message.BodyEncoding = Encoding.UTF8;
                message.IsBodyHtml = true;

                SmtpClient client = new SmtpClient("smtp.mail.ru", 587);
                client.Credentials = new NetworkCredential(senderEmail, password);
                client.EnableSsl = true;
                client.Send(message);
                Console.WriteLine("Код успешно отправлен на указанный email.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Ошибка при отправке кода: " + ex.Message);
            }
        }
    }


    public class EmailBody
    {
        public static string GetBody(string companyName, string emailBody)
        {
            return $@"<html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                        }}
                        h1 {{
                            font-size: 24px;
                            font-weight: bold;
                            color: #D9905E;
                        }}
                        p {{
                            margin-bottom: 10px;
                        }}
                    </style>
                </head>
                <body>
                    <h1>{companyName}</h1>
                    <p>{emailBody}</p>
                </body>
                </html>";
        }
    }
}