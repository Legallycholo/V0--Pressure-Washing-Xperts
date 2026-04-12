/** Single source for business location and top-bar slogan (navbar, footer, contact). */

export const navSlogan =
  'We don\'t do "good enough." We do Xpert.' as const

export const businessAddressLines = [
  "2193 Gateway Trl",
  "Ellenwood, GA 30294",
] as const

export const businessAddress =
  `${businessAddressLines[0]}, ${businessAddressLines[1]}` as const

export const businessMapsUrl =
  "https://www.google.com/maps/place/Pressure+Washing+Xperts/@33.6542916,-84.4339176,12z/data=!4m10!1m2!2m1!1sPressure+Washing+Xperts+LLC+dekalb!3m6!1s0x88f4ff586effbf87:0xdce4ba9e7e2c13d9!8m2!3d33.6542916!4d-84.2938419!15sCiJQcmVzc3VyZSBXYXNoaW5nIFhwZXJ0cyBMTEMgZGVrYWxiWiQiInByZXNzdXJlIHdhc2hpbmcgeHBlcnRzIGxsYyBkZWthbGKSARhwcmVzc3VyZV93YXNoaW5nX3NlcnZpY2WaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMjV3UzJScVdYUk5WM2hoVVZkS1JGUnNSbmxWU0ZJelRsUkdhRTFJWXhBQuABAPoBBAgAED4!16s%2Fg%2F11vpwbzydj?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D" as const
