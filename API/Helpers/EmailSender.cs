using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class EmailSender
    {
        private static string smtpServer = "smtp.mail.ru"; // Замените на адрес SMTP сервера
        private static int port = 993; // Порт SMTP сервера
        private static string senderEmail = "webgnule@mail.ru"; // Ваш email
        private static string password = "03041121K"; // Пароль от вашего email

        public static void SendCode(string recipientEmail, string uniqueCode)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(senderEmail);
                mail.To.Add(recipientEmail);
                mail.Subject = "Уникальный код для регистрации";
                mail.Body = $"Ваш уникальный код: {uniqueCode}";

                using (SmtpClient smtpClient = new SmtpClient(smtpServer, port))
                {
                    smtpClient.Credentials = new NetworkCredential(senderEmail, password);
                    smtpClient.EnableSsl = true;

                    try
                    {
                        smtpClient.Send(mail);
                        Console.WriteLine("Код успешно отправлен на указанный email.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Ошибка при отправке кода: {ex.Message}");
                    }
                }
            }
        }
    }
}