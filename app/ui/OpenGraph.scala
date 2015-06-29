package lila.app
package ui

import play.twirl.api.Html

case class OpenGraph(
    title: String,
    description: String,
    url: String,
    `type`: String = "website",
    image: Option[String] = None,
    siteName: String = "lichess.org",
    more: List[(String, String)] = Nil) {

  def html = Html(toString)

  private def tag(name: String, value: String) =
    s"""<meta property="og:$name" content="$value" />"""

  private val tupledTag = (tag _).tupled

  override def toString = List(
    "title" -> title,
    "description" -> description,
    "url" -> url,
    "type" -> `type`,
    "siteName" -> siteName
  ).map(tupledTag).mkString +
    image.?? { tag("image", _) } +
    more.map(tupledTag).mkString
}
