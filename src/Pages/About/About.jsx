import React from 'react'
import { Helmet } from 'react-helmet'

export const About = () => {
  return (
    <div>
       <Helmet>
        <title>About - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link
          rel="shortcut icon"
          href="ch_favLogo.png"
          type="image/x-icon"
        />
      </Helmet>
    </div>
  )
}
