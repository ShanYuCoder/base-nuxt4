<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    /** Root `data-testid` for the card shell (e.g. auth-login-page). */
    pageTestId?: string
    brandTestId?: string
    subtitleTestId?: string
    showBrand?: boolean
  }>(),
  {
    showBrand: true
  }
)
</script>

<template>
  <Card class="w-full" :data-testid="props.pageTestId">
    <CardHeader class="space-y-1 text-center">
      <p
        v-if="props.showBrand"
        class="text-xl font-semibold tracking-tight"
        :data-testid="props.brandTestId"
      >
        {{ $t('auth.brand') }}
      </p>
      <CardTitle class="text-2xl">{{ props.title }}</CardTitle>
      <CardDescription v-if="props.description" :data-testid="props.subtitleTestId">
        {{ props.description }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <slot />
    </CardContent>
    <CardFooter v-if="$slots.footer" class="flex flex-col gap-4 border-t pt-6">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
