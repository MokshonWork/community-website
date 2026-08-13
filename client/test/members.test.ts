import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemberNode from '~/components/members/MemberNode.vue'
import MembersTree from '~/components/members/MembersTree.vue'
import { memberTree } from '~/data/members'
import type { MemberNode as MemberNodeData } from '~/data/members'

function flatten(node: MemberNodeData): MemberNodeData[] {
  return [node, ...(node.children?.flatMap(flatten) ?? [])]
}

describe('members data', () => {
  it('keeps the existing top hierarchy intact', () => {
    const owner = memberTree[0]
    expect(owner?.name).toBe('Majestic')
    expect(owner?.role).toBe('Owner')

    const admin = owner?.children?.[0]
    expect(admin?.name).toBe('Sir Wizard')
    expect(admin?.role).toBe('Administrator')

    expect(admin?.children?.map(node => node.name)).toEqual([
      '0xNA',
      'Crunch',
      'Divyansh',
    ])
  })

  it('does not duplicate 0xNA', () => {
    const allNames = memberTree.flatMap(flatten).map(node => node.name)
    expect(allNames.filter(name => name === '0xNA')).toHaveLength(1)
  })

  it('hangs the contributors off 0xNA as its children', () => {
    const lead = memberTree[0]?.children?.[0]?.children?.[0]
    expect(lead?.name).toBe('0xNA')
    expect(lead?.role).toBe('Moderator · Website Manager')
    expect(lead?.children?.map(node => node.name)).toEqual([
      'Voda',
      'Aditya',
      'Moksh',
    ])
    expect(lead?.children?.map(node => node.role)).toEqual([
      'Backend',
      'Backend',
      'Frontend',
    ])
  })
})

describe('MemberNode', () => {
  it('renders name and role for a contributor without an avatar image', () => {
    const wrapper = mount(MemberNode, {
      props: {
        node: {
          name: 'Voda',
          role: 'Backend',
          initials: '/v',
        },
      },
    })

    expect(wrapper.text()).toContain('Voda')
    expect(wrapper.text()).toContain('Backend')
    expect(wrapper.text()).toContain('/v')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('renders an avatar image for members with an existing asset', () => {
    const wrapper = mount(MemberNode, {
      props: {
        node: {
          name: 'Majestic',
          role: 'Owner',
          avatar: '/assets/owner.png',
        },
      },
    })

    expect(wrapper.find('img').attributes('alt')).toBe('Majestic')
  })

  it('renders a clickable GitHub link when a member has a configured social URL', () => {
    const wrapper = mount(MemberNode, {
      props: {
        node: {
          name: 'Moksh',
          role: 'Frontend',
          avatar: '/assets/moksh.png',
          socials: { github: 'https://github.com/MokshonWork' },
        },
      },
      global: { stubs: { UIcon: true } },
    })

    const link = wrapper.find('a[href="https://github.com/MokshonWork"]')
    expect(link.exists()).toBe(true)
    expect(link.attributes('aria-label')).toBe("Moksh's GitHub")
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })

  it('does not render social links when none are configured', () => {
    const wrapper = mount(MemberNode, {
      props: {
        node: {
          name: 'Voda',
          role: 'Backend',
          initials: '/v',
        },
      },
      global: { stubs: { UIcon: true } },
    })

    expect(wrapper.find('a').exists()).toBe(false)
  })
})

describe('MembersTree', () => {
  it('renders the full hierarchy including contributors, without duplicating 0xNA', () => {
    const wrapper = mount(MembersTree, {
      props: { tree: memberTree },
      global: {
        components: {
          MembersMemberNode: MemberNode,
        },
      },
    })

    const text = wrapper.text()

    for (const name of [
      'Majestic',
      'Sir Wizard',
      '0xNA',
      'Crunch',
      'Divyansh',
      'Voda',
      'Aditya',
      'Moksh',
    ]) {
      expect(text).toContain(name)
    }

    expect(text).toContain('Moderator · Website Manager')
    expect(text.match(/0xNA/g)).toHaveLength(1)
  })

  it('renders GitHub, LinkedIn, and X for every member, with Moksh\'s GitHub real', () => {
    const wrapper = mount(MembersTree, {
      props: { tree: memberTree },
      global: {
        components: {
          MembersMemberNode: MemberNode,
        },
        stubs: { UIcon: true },
      },
    })

    const links = wrapper.findAll('a[href]')
    expect(links).toHaveLength(24)

    const real = wrapper.find('a[href="https://github.com/MokshonWork"]')
    expect(real.exists()).toBe(true)
    expect(real.attributes('aria-label')).toBe("Moksh's GitHub")

    const placeholders = links.filter(
      link => link.attributes('href') === 'https://example.com/placeholder',
    )
    expect(placeholders).toHaveLength(23)
  })
})