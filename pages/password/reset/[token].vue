<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAuthResetPasswordForm } from '~/composables/auth/useAuthResetPasswordForm'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const route = useRoute()
const tokenParam = computed(() => String(route.params.token ?? ''))
const emailQuery = computed(() => String(route.query.email ?? ''))

const { apiError, isSubmitting, onSubmit, errors } = useAuthResetPasswordForm({
  email: emailQuery.value,
  token: tokenParam.value
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: password_confirmation } = useField<string>('password_confirmation')
const { value: token } = useField<string>('token')

watch(tokenParam, (value) => {
  token.value = value
})

watch(emailQuery, (value) => {
  email.value = value
})
</script>

<template>
  <AuthCard
    :title="$t('auth.resetTitle')"
    :description="$t('auth.resetSubtitle')"
    page-test-id="auth-reset-page"
    :show-brand="false"
  >
    <form class="grid gap-4" data-testid="auth-reset-form" @submit.prevent="onSubmit">
      <input v-model="token" type="hidden" name="token" />

      <Alert v-if="apiError" variant="destructive">
        <AlertDescription>{{ apiError }}</AlertDescription>
      </Alert>

      <div class="grid gap-2">
        <Label for="auth-reset-email">{{ $t('auth.emailPlaceholder') }}</Label>
        <Input
          id="auth-reset-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :placeholder="$t('auth.emailPlaceholder')"
          :aria-invalid="!!errors.email"
        />
        <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
      </div>

      <div class="grid gap-2">
        <Label for="auth-reset-password">{{ $t('auth.newPassword') }}</Label>
        <Input
          id="auth-reset-password"
          v-model="password"
          type="password"
          name="password"
          autocomplete="new-password"
          required
          :placeholder="$t('auth.newPasswordPlaceholder')"
          :aria-invalid="!!errors.password"
        />
        <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
      </div>

      <div class="grid gap-2">
        <Label for="auth-reset-password-confirm">{{ $t('auth.newPasswordConfirm') }}</Label>
        <Input
          id="auth-reset-password-confirm"
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          autocomplete="new-password"
          required
          :placeholder="$t('auth.confirmPasswordPlaceholder')"
          :aria-invalid="!!errors.password_confirmation"
        />
        <p v-if="errors.password_confirmation" class="text-sm text-destructive">
          {{ errors.password_confirmation }}
        </p>
      </div>

      <Button type="submit" class="w-full" :disabled="isSubmitting">
        {{ isSubmitting ? $t('auth.updating') : $t('auth.update') }}
      </Button>
    </form>

    <template #footer>
      <p class="text-center text-sm text-muted-foreground">
        <NuxtLink to="/auth/login" class="text-primary underline-offset-4 hover:underline">
          {{ $t('auth.backToLogin') }}
        </NuxtLink>
      </p>
    </template>
  </AuthCard>
</template>
