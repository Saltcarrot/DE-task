export const useFetch = () => {
  const fetchFeedbackData = (values) => {
    return new Promise((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: `New post`,
          body: `${values.email} ${values.name} ${values.message}`,
          userId: 1,
        }),
      })
        .then((res) => res.json())
        .then((res) => resolve(!!res.id))
        .catch(() => {
          reject('Form sent unsuccessful')
        })
    })
  }

  return { fetchFeedbackData }
}