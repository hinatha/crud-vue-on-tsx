import { Ref, isRef, ref, computed } from 'vue'

// Function for formatting date
export const useFormatDate = (date: Date | Ref<Date>) => {
  // isRef() decide if date is Ref or not
  // If date is not ref, become ref date
  const dateRef = isRef(date) ? date : ref(date)

  // Format dateRef like below
  // 2022/12/01
  return computed(() => {
    return `${dateRef.value.getFullYear()}/${
      dateRef.value.getMonth() + 1
    }/${dateRef.value.getDate()}`
  })
}
