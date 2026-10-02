<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAuthLoginForm } from '~/composables/auth/useAuthLoginForm'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { apiError, isSubmitting, onSubmit, errors } = useAuthLoginForm()
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
</script>

<template>
  <AuthCard
    :title="$t('auth.loginTitle')"
    :description="$t('auth.loginSubtitle')"
    page-test-id="auth-login-page"
    brand-test-id="auth-login-logo"
    subtitle-test-id="auth-login-subtitle"
  >
    <form class="grid gap-4" data-testid="auth-login-form" @submit.prevent="onSubmit">
      <Alert v-if="apiError" variant="destructive" data-testid="auth-login-error-alert">
        <AlertDescription>{{ apiError }}</AlertDescription>
      </Alert>

      <div class="grid gap-2">
        <Label for="auth-login-email">{{ $t('auth.email') }}</Label>
        <Input
          id="auth-login-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          data-testid="auth-login-email-input"
          :aria-invalid="!!errors.email"
        />
      </div>

      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="auth-login-password">{{ $t('auth.password') }}</Label>
          <NuxtLink
            to="/password/reset"
            class="ml-auto inline-block text-sm text-primary underline-offset-4 hover:underline"
            data-testid="auth-login-forgot-link"
          >
            {{ $t('auth.forgotPasswordLink') }}
          </NuxtLink>
        </div>
        <Input
          id="auth-login-password"
          v-model="password"
          type="password"
          name="password"
          autocomplete="current-password"
          required
          data-testid="auth-login-password-input"
          :aria-invalid="!!errors.password"
        />
      </div>

      <p
        v-if="errors.email || errors.password"
        class="text-sm text-destructive"
        data-testid="auth-login-validation-error"
      >
        {{ errors.email || errors.password }}
      </p>

      <Button type="submit" class="w-full" :disabled="isSubmitting" data-testid="auth-login-submit-btn">
        {{ isSubmitting ? $t('auth.signingIn') : $t('auth.loginButton') }}
      </Button>
    </form>
  </AuthCard>
</template>
