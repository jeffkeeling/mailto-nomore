// Get all anchor tags with an href attribute starting with "mailto:"
const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]')

// Create and style notification element
const notification = document.createElement('div')
notification.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  display: none;
  z-index: 9999;
  font-family: system-ui, -apple-system, sans-serif;
`
notification.textContent = 'Copied!'
document.body.appendChild(notification)

// Show notification function
const showNotification = () => {
  notification.style.display = 'block'
  setTimeout(() => {
    notification.style.display = 'none'
  }, 2000) // Hide after 2 seconds
}

// Loop through each link
mailtoLinks.forEach((link) => {
  const linkWrapper = document.createElement('div')
  linkWrapper.style.display = 'inline-block'

  linkWrapper.addEventListener('click', async (event) => {
    event.preventDefault()

    // Extract email address from mailto link
    const email = link.href.replace('mailto:', '').split('?')[0]

    try {
      await navigator.clipboard.writeText(email)
      showNotification()
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  })

  link.replaceWith(linkWrapper)
  linkWrapper.appendChild(link)
})
