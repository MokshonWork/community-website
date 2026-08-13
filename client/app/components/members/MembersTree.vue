<template>
  <div class="relative w-full flex flex-col items-center">
    <template v-for="(level, depth) in levels" :key="depth">
      <div class="w-full flex flex-col md:flex-row justify-center gap-8">
        <div
          v-for="(node, index) in level"
          :key="node.name"
          class="relative flex flex-col items-center flex-1 max-w-[280px]"
        >
          <!-- Desktop horizontal branch connectors between sibling cards -->
          <div
            v-if="level.length > 1 && index < level.length - 1"
            class="hidden md:block absolute top-0 left-1/2 w-[calc(50%+16px)] h-[2px] bg-gray-200"
          />
          <div
            v-if="level.length > 1 && index > 0"
            class="hidden md:block absolute top-0 right-1/2 w-[calc(50%+16px)] h-[2px] bg-gray-200"
          />
          <div
            v-if="level.length > 1"
            class="hidden md:block absolute top-0 w-[2px] h-8 bg-gray-200"
          />
          <!-- Mobile vertical connector between stacked cards -->
          <div
            v-if="level.length > 1 && index < level.length - 1"
            class="md:hidden absolute -bottom-8 w-[2px] h-8 bg-gray-200"
          />

          <MembersMemberNode
            :node="node"
            :class="level.length > 1 ? 'mt-0 md:mt-8' : ''"
          />

          <!-- Branch label + vertical drop leading to the next level -->
          <template v-if="node.children && node.children.length > 0">
            <p
              v-if="node.label"
              class="mt-7 mb-3 text-black/50 text-base tracking-[0.2em] uppercase"
              style="font-family: 'JetBrains Mono Light', monospace;"
            >{{ node.label }}</p>
            <div class="w-[2px] h-10 bg-gray-200" />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MemberNode } from '~/data/members'

const props = defineProps<{ tree: MemberNode[] }>()

function collectLevels(roots: MemberNode[]): MemberNode[][] {
  const levels: MemberNode[][] = []
  let level = roots
  while (level.length > 0) {
    levels.push(level)
    level = level.flatMap(node => node.children ?? [])
  }
  return levels
}

const levels = computed(() => collectLevels(props.tree))
</script>