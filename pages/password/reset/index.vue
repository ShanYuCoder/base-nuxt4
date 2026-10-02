<script setup lang="ts">
import { useField } from 'vee-validate'
import { useAuthForgotPasswordForm } from '~/composables/auth/useAuthForgotPasswordForm'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { apiError, successMessage, isSubmitting, onSubmit, errors } = useAuthForgotPasswordForm()
const { value: email } = useField<string>('email')
</script>

<template>
  <AuthCard
    :title="$t('auth.forgotTitle')"
    :description="$t('auth.forgotSubtitle')"
    page-test-id="auth-forgot-page"
    :show-brand="false"
  >
    <form class="grid gap-4" data-testid="auth-forgot-form" @submit.prevent="onSubmit">
      <Alert v-if="successMessage" variant="success">
        <AlertDescription>{{ successMessage }}</AlertDescription>
      </Alert>

      <Alert v-if="apiError" variant="destructive">
        <AlertDescription>{{ apiError }}</AlertDescription>
      </Alert>

      <div class="grid gap-2">
        <Label for="auth-forgot-email">{{ $t('auth.emailPlaceholder') }}</Label>
        <Input
          id="auth-forgot-email"
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          autofocus
          required
          :placeholder="$t('auth.emailPlaceholder')"
          :aria-invalid="!!errors.email"
        />
        <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
      </div>

      <Button type="submit" class="w-full" :disabled="isSubmitting">
        {{ isSubmitting ? $t('auth.sending') : $t('auth.forgotSendButton') }}
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
