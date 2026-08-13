<template>
  <div
    class="w-full max-w-[280px] flex flex-col items-center bg-[#f7f7f7] px-8 pt-10 pb-1 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10 text-center"
  >
    <img
      v-if="node.avatar"
      :src="node.avatar"
      :alt="node.name"
      class="w-20 h-20 rounded-full mb-5 object-cover shadow-sm"
    >
    <div
      v-else
      role="img"
      :aria-label="`${node.name} avatar`"
      class="w-20 h-20 rounded-full bg-black mb-5 flex items-center justify-center shadow-sm"
    >
      <span
        class="text-white text-lg tracking-wide"
        style="font-family: 'JetBrains Mono SemiBold', monospace;"
      >{{ node.initials }}</span>
    </div>
    <h3
      class="font-normal text-lg text-black"
      style="font-family: 'JetBrains Mono ExtraBold', monospace;"
    >{{ node.name }}</h3>
    <p
      class="text-sm text-gray-400 mt-2 mb-2 leading-snug"
      style="font-family: 'JetBrains Mono Regular', monospace;"
    >{{ node.role }}</p>
    <div class="h-8 flex items-center justify-center gap-5">
      <a
        v-for="social in socials"
        :key="social.label"
        :href="social.url"
        :aria-label="`${node.name}'s ${social.label}`"
        target="_blank"
        rel="noopener noreferrer"
        class="p-1.5 -m-1.5 text-black/40 hover:text-black transition-colors duration-200"
      >
        <UIcon :name="social.icon" class="w-4 h-4" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MemberNode } from '~/data/members'

const props = defineProps<{ node: MemberNode }>()

const socialPlatforms = [
  { key: 'github', label: 'GitHub', icon: 'i-simple-icons-github' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  { key: 'twitter', label: 'X', icon: 'i-simple-icons-x' },
] as const

const socials = computed(() =>
  socialPlatforms.flatMap(({ key, label, icon }) => {
    const url = props.node.socials?.[key]
    return url ? [{ label, icon, url }] : []
  }),
)
</script>