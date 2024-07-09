using System;
using API.Interfaces;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace API.Services
{
    public class SmsService : ISmsService
    {
        private const string accountSid = "AC3b92b8a76cdd07de037b528b22dd1956";
        private const string authToken = "72aef602fc8cec0299a47dc32d39272c";
        private const string twilioPhoneNumber = "16502579230";

        public void SendSms(string phoneNumber, string password)
        {
            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: $"PawMatch - Your registration password is: {password}",
                from: new Twilio.Types.PhoneNumber(twilioPhoneNumber),
                to: new Twilio.Types.PhoneNumber(phoneNumber)
            );

            Console.WriteLine($"SMS sent with SID: {message.Sid}");
        }
    }
}
