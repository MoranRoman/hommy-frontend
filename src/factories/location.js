import { adsFiltersNames } from '../configs/globals'

export const modifyStringWithQueryParams = (string) => {
  const params = new URLSearchParams(window.location.search)

  adsFiltersNames.forEach((filter) => {
    const value = params.get(filter)
    if (value) string += `&${filter}=${value}`
  })

  return string
}
