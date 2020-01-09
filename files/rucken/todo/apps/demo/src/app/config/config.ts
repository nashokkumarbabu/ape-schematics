import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { translate } from '@rucken/core';
import { RuI18n } from '../i18n/ru.i18n';
import { ICoreConfig } from './config.interface';

library.add(fas, fab);

export const config: ICoreConfig = {
  app: {
    id: 'todo-demo',
    title: translate('Rucken: Todo'),
    description: translate('Core with UI for web todo application maked on Angular7+ based on Rucken template'),
    languages: [
      {
        title: translate('Russian'),
        code: 'ru',
        translations: [RuI18n]
      }
    ]
  },
  authModal: {
    signInInfoMessage: {
      text: `<p>{{title}}</p><ul><li>{{user1}}</li><li>{{user2}}</li><li>{{user3}}</li></ul>`,
      data: {
        title: translate('Demo users:'),
        user1: translate('user with admin group: admin@admin.com, password: 12345678'),
        user2: translate('user with user group: user1@user1.com, password: 12345678'),
        user3: translate('user with user group: user2@user2.com, password: 12345678')
      }
    },
    signUpInfoMessage: ''
  },
  oauth: [
    {
      name: 'facebook',
      icon: ['fab', 'facebook-square'],
      signInTitle: translate('Sign in with Facebook')
    },
    {
      name: 'google-plus',
      icon: ['fab', 'google-plus'],
      signInTitle: translate('Sign in with Google+')
    }
  ]
};
