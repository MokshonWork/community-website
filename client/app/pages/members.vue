<template>
  <div class="flex flex-col items-center w-full">
    <header class="flex flex-col items-center text-center px-6 pt-4 md:pt-8 pb-16 md:pb-20">
      <h1
        class="text-4xl md:text-5xl font-normal text-black tracking-tight"
        style="font-family: 'JetBrains Mono ExtraBold', monospace;"
      >Members</h1>
      <p
        class="mt-4 text-gray-500 text-lg"
        style="font-family: 'JetBrains Mono Regular', monospace;"
      >Meet our team, moderators, and core contributors.</p>
    </header>

    <MembersTree :tree="memberTree" />

    <div class="h-16" />
  </div>
</template>

<script setup lang="ts">
import { memberTree } from '~/data/members'

useHead({
  title: 'Members | NEXT-GEN Programmers',
})
</script>

<style>
@font-face {
  font-family: 'JetBrains Mono Regular';
  src: url('~/assets/fonts/JetBrainsMono-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'JetBrains Mono SemiBold';
  src: url('~/assets/fonts/JetBrainsMono-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'JetBrains Mono ExtraBold';
  src: url('~/assets/fonts/JetBrainsMono-ExtraBold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'JetBrains Mono Light';
  src: url('~/assets/fonts/JetBrainsMono-Light.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
</style>