import ownerPng from '~/assets/images/pfp/owner.png'
import adminPng from '~/assets/images/pfp/admin.png'
import mod1Png from '~/assets/images/pfp/mod1.png'
import mod2Png from '~/assets/images/pfp/mod2.png'
import mod3Png from '~/assets/images/pfp/mod3.png'
import vodaPfp from '~/assets/images/pfp/Voda.jpeg'
import adityaPfp from '~/assets/images/pfp/Aditya.png'
import mokshPfp from '~/assets/images/pfp/Moksh.jpeg'

export interface MemberNode {
  name: string
  role: string
  avatar?: string
  initials?: string
  label?: string
  socials?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  children?: MemberNode[]
}

const placeholder = 'https://example.com/placeholder'

export const memberTree: MemberNode[] = [
  {
    name: 'Majestic',
    role: 'Owner',
    avatar: ownerPng,
    socials: {
      github: placeholder,
      linkedin: placeholder,
      twitter: placeholder,
    },
    children: [
      {
        name: 'Sir Wizard',
        role: 'Administrator',
        avatar: adminPng,
        socials: {
          github: placeholder,
          linkedin: placeholder,
          twitter: placeholder,
        },
        children: [
          {
            name: '0xNA',
            role: 'Moderator · Website Manager',
            avatar: mod1Png,
            label: 'Contributors',
            socials: {
              github: placeholder,
              linkedin: placeholder,
              twitter: placeholder,
            },
            children: [
              {
                name: 'Voda',
                role: 'Backend',
                avatar: vodaPfp,
                socials: {
                  github: placeholder,
                  linkedin: placeholder,
                  twitter: placeholder,
                },
              },
              {
                name: 'Aditya',
                role: 'Backend',
                avatar: adityaPfp,
                socials: {
                  github: placeholder,
                  linkedin: placeholder,
                  twitter: placeholder,
                },
              },
              {
                name: 'Moksh',
                role: 'Frontend',
                avatar: mokshPfp,
                socials: {
                  github: 'https://github.com/MokshonWork',
                  linkedin: placeholder,
                  twitter: placeholder,
                },
              },
            ],
          },
          {
            name: 'Crunch',
            role: 'Moderator',
            avatar: mod2Png,
            socials: {
              github: placeholder,
              linkedin: placeholder,
              twitter: placeholder,
            },
          },
          {
            name: 'Divyansh',
            role: 'Moderator',
            avatar: mod3Png,
            socials: {
              github: placeholder,
              linkedin: placeholder,
              twitter: placeholder,
            },
          },
        ],
      },
    ],
  },
]