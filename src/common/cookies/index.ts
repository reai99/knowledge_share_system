import Cookies from "@/utils/cookie"

// 侧边栏状态
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

// 语言
const languageKey = 'lang'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

// 布局大小
const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)