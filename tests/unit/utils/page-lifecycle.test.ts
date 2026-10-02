import { describe, expect, it } from 'vitest'

import {
  getAuthBypassPaths,
  getPageLifecycleEntry,
  isAuthBypassStage
} from '~/utils/page-lifecycle'

describe('page-lifecycle', () => {
  it('bypasses auth for all stages before wire', () => {
    expect(isAuthBypassStage('design-spec')).toBe(true)
    expect(isAuthBypassStage('prototype')).toBe(true)
    expect(isAuthBypassStage('test')).toBe(true)
    expect(isAuthBypassStage('wire')).toBe(false)
  })

  it('returns no auth bypass paths when registry is empty', () => {
    expect(getAuthBypassPaths()).toEqual([])
  })

  it('returns undefined for unregistered routes', () => {
    expect(getPageLifecycleEntry('/hotels')).toBeUndefined()
  })
})
