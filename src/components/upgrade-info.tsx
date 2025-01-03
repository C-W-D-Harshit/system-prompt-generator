interface UpgradeInfoProps {
  showApiKeyInput: boolean
}

export function UpgradeInfo({ showApiKeyInput }: UpgradeInfoProps) {
  return (
    <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
      <h3 className="font-semibold mb-2">Upgrade Information</h3>
      {showApiKeyInput ? (
        <p>
          You've reached the free usage limit. Please enter your API key to continue using the
          System Prompt Generator. If you don't have an API key, you can obtain one by upgrading
          your account on our website.
        </p>
      ) : (
        <p>
          You have 5 free prompt generations. After that, you'll need to use an API key to
          continue. Upgrade your account to get unlimited generations and additional features.
        </p>
      )}
    </div>
  )
}

