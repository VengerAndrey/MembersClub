export function handleErrors(errors: any): void {
    const networkError = errors?.networkError
    if (networkError) {
      alert('Remote service is not available.')
    }
    const gqlErrors =  errors?.graphQLErrors
    if (gqlErrors && gqlErrors.length) {
      let message = ''
      gqlErrors.forEach((e: any) => JSON.parse(e?.message ?? '[]').forEach((m: string) => message += m + '\n'))
      if (message) {
        alert('Some errors have occurred:\n' + message)
      }
    }
  }