<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
  class?: HTMLAttributes['class']
  /** Root nav test id; items → `{testId}-item-{n}`, current → `{testId}-current` */
  testId?: string
}>()

function isInternalLink(href?: string) {
  return Boolean(href?.startsWith('/'))
}
</script>

<template>
  <nav aria-label="breadcrumb" :class="cn(props.class)" :data-testid="testId">
    <ol class="app-breadcrumb">
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
        class="app-breadcrumb-item"
        :data-testid="testId ? `${testId}-item-${index}` : undefined"
      >
        <NuxtLink
          v-if="item.href && isInternalLink(item.href) && index < items.length - 1"
          :to="item.href"
          class="app-breadcrumb-link"
          :data-testid="testId ? `${testId}-link-${index}` : undefined"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          v-else-if="item.href && index < items.length - 1"
          :href="item.href"
          class="app-breadcrumb-link"
          :data-testid="testId ? `${testId}-link-${index}` : undefined"
        >
          {{ item.label }}
        </a>
        <span v-else class="app-breadcrumb-current" :data-testid="testId ? `${testId}-current` : undefined">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.app-breadcrumb {
  margin: 0;
  padding: 5px 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: transparent;
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
}

.app-breadcrumb-item {
  display: inline-flex;
  align-items: center;
  padding-left: 0;
}

.app-breadcrumb-item + .app-breadcrumb-item::before {
  content: '\203A';
  padding: 0 5px;
  color: #515050;
  font-size: 12px;
  font-weight: 700;
}

.app-breadcrumb-link,
.app-breadcrumb-current {
  margin-left: 5px;
  margin-right: 5px;
  font-size: 10.5px;
  letter-spacing: 0.06em;
}

.app-breadcrumb-link {
  color: #7b7d82;
  font-weight: 400;
}

.app-breadcrumb-current {
  color: #0090d9;
  font-weight: 500;
}
</style>
