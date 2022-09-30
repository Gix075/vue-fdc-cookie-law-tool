import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'it-IT',
  title: 'VueJS3 FDC Cookie Law Tool ',
  description: 'VueJS3 FDC Cookie Law Tool Documentation',
  theme: defaultTheme({
    // default theme config
    logo: '/images/logo.png',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
  }),
})
