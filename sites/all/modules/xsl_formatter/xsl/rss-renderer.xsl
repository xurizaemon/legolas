<?xml version="1.0" encoding="ISO-8859-1"?>
        <!--
        Pulled from http://www.evagoras.com/2011/02/10/improving-an-xml-feed-display-through-css-and-xslt/
        Then modified by ~dman for inline style, html escaping, and embedding.
        -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/rss">
            <style type="text/css">
                .rssResult  {
                font-size:small;
                line-height:1.4em;
                font-family:Tahoma, Verdana, Arial, Helvetica, sans-serif;
                }

                .rssResult a:visited {
                color:#666666;
                }
                .rssResult a:hover {
                color: #F00;
                }
                #rssLogo {
                border-top:0.2em solid #235B9C;
                background-color:#4483C7;
                padding:0.2em 0.4em 0.4em;
                color:#FFF;
                font-family:"Trebuchet MS", Verdana, Arial, SunSans-Regular, Sans-Serif;
                font-size:240%;
                }
                #rssLogo a:link, #rssLogo a:visited {
                text-decoration:none;
                color:#FFF;
                }

                .channel {
                margin-bottom:2em;
                border:1px solid #538620;
                background-color:#FFFFEE;
                }
                .channel .titleWithLine {
                background-color:#FFF;
                border-bottom:1px solid #538620;
                color:#538620;
                font-size:86%;
                letter-spacing:0.1em;
                margin:0;
                padding:0.3em 1em;
                }
                .channel dl.channelItems {
                margin-left:1em;
                margin-right:1em;
                }
                .channel dl dd {
                font-size:110%;
                margin:0;
                padding-bottom:0.2em;
                }
                .channel dl dt {
                border-bottom: 1px solid #EEE;
                font-size:86%;
                line-height:145%;
                margin-bottom:0.6em;
                padding-bottom:0.4em;
                }
                .channel dl dt .comments {
                color:#666;
                font-size:86%;
                }
                .channel .updated {
                color:#666666;
                font-size:80%;
                padding:0 1em;
                text-align:center
                }
            </style>
            <div class="rssResult">
                <div id="rssLogo">
                    <xsl:element name="a">
                        <xsl:attribute name="href">
                            <xsl:value-of select="channel/link" />
                        </xsl:attribute>
                        <xsl:value-of select="channel/title" />
                    </xsl:element>
                </div>
                <div class="channel" >
                    <div class="titleWithLine">
                        <xsl:value-of select="channel/description" />
                    </div>
                    <dl class="channelItems">
                        <xsl:for-each select="channel/item">
                            <dd>
                                <xsl:element name="a">
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="link"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="title"/>
                                </xsl:element>
                            </dd>
                            <dt>
                                <div class="description"><xsl:value-of select="description" disable-output-escaping="yes" /></div>
                                <span class="comments"><xsl:value-of select="pubDate" /></span>
                            </dt>
                        </xsl:for-each>
                    </dl>
                </div>
                <div id="footer">
                    <xsl:value-of select="channel/copyright" />
                </div>
            </div>
    </xsl:template>
</xsl:stylesheet>
