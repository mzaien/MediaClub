import React from "react"
import { withPreviewResolver } from "gatsby-source-prismic"

import linkResolver from "../utils/linkResolver"

import Layout from "../components/layout"
import Seo from "../components/seo"

const PreviewPage = ({ isPreview, isLoading }) => {
  if (isPreview === false) return "ليست معاينة!"

  return (
    <Layout>
      <Seo title="صفحة المعاينة" />
      {isLoading && <p>جاري التحميل...</p>}
    </Layout>
  )
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: "mediaclub",
  linkResolver,
})
