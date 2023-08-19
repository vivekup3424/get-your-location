import dotenv from "dotenv"
import { useState } from "react"
import { BeatLoader } from "react-spinners"

import countryCodes from "../../assets/country-codes.json"

dotenv.config()
const LocationButton = ({ onLocationChange }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const ipAddressResponse = await fetch("https://api.ipify.org?format=json")
      const { ip } = await ipAddressResponse.json()

      const ipInfoResponse = await fetch(
        `https://ipinfo.io/${ip}?token=${
          process.env.IPINFO_ACCESS_TOKEN || "0836df2134ee04"
        }`
      )
      const { country, city } = await ipInfoResponse.json()

      const countryName = countryCodes[country] || "Unknown"
      onLocationChange(`Your country is ${countryName} and city is ${city}. 🎉`)
    } catch (error) {
      console.error(error)
      onLocationChange("Error getting location")
    }

    setIsLoading(false)
  }

  return (
    <button
      type="button"
      className="plasmo-flex plasmo-flex-row plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-border-none plasmo-shadow-lg hover:plasmo-shadow-md active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-800 hover:plasmo-text-slate-900 plasmo-max-w-xs"
      onClick={handleClick}
      disabled={isLoading}>
      {isLoading ? (
        <span className="plasmo-flex plasmo-flex-col">
          <BeatLoader color="red" size={8} className="plasmo-block" />
          <span className="plasmo-m-auto plasmo-width-auto plasmo-font-bold">
            Loading...
          </span>
        </span>
      ) : (
        "Show my location"
      )}
    </button>
  )
}

export default LocationButton