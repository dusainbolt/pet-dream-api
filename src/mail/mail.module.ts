import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import config from 'src/configs';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL - TLS
        // pool: true,
        // requireTLS: true,
        auth: {
          user: config.mail.user,
          pass: config.mail.password,
        },
      },
      defaults: {
        from: `no-reply@dule9xpro@gmail.com`,
      },
      template: {
        dir: 'data/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
