<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAuthRegisterForm } from '~/composables/auth/useAuthRegisterForm'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { apiError, isSubmitting, onSubmit, errors } = useAuthRegisterForm()
const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: password_confirmation } = useField<string>('password_confirmation')
</script>

<template>
  <AuthCard
    :title="$t('auth.registerTitle')"
    :description="$t('auth.registerSubtitle')"
    page-test-id="auth-register-page"
  >
    <form class="grid gap-4" data-testid="auth-register-form" @submit.prevent="onSubmit">
      <Alert v-if="apiError" variant="destructive">
        <AlertDescription>{{ apiError }}</AlertDescription>
      </Alert>

      <div class="grid gap-2">
        <Label for="auth-register-name">{{ $t('auth.optionalName') }}</Label>
        <Input
          id="auth-register-name"
          v-model="name"
          type="text"
          name="name"
          autocomplete="name"
          :placeholder="$t('auth.optionalName')"
        />
      </div>

      <div class="grid gap-2">
        <Label for="auth-register-email">{{ $t('auth.email') }}</Label>
        <Input
          id="auth-register-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          required
          :aria-invalid="!!errors.email"
        />
        <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
      </div>

      <div class="grid gap-2">
        <Label for="auth-register-password">{{ $t('auth.password') }}</Label>
        <Input
          id="auth-register-password"
          v-model="password"
          type="password"
          name="password"
          autocomplete="new-password"
          required
          :aria-invalid="!!errors.password"
        />
        <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
      </div>

      <div class="grid gap-2">
        <Label for="auth-register-password-confirm">{{ $t('auth.confirmPassword') }}</Label>
        <Input
          id="auth-register-password-confirm"
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          autocomplete="new-password"
          required
          :aria-invalid="!!errors.password_confirmation"
        />
        <p v-if="errors.password_confirmation" class="text-sm text-destructive">
          {{ errors.password_confirmation }}
        </p>
      </div>

      <Button type="submit" class="w-full" :disabled="isSubmitting">
        {{ isSubmitting ? $t('common.loading') : $t('auth.register') }}
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
