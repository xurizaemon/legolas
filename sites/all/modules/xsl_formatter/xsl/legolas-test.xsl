<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/TR/xhtml1/strict">

<xsl:strip-space elements="doc chapter section"/>
<xsl:output
   method="xml"
   indent="yes"
   encoding="iso-8859-1"
/>

<xsl:template match="@*|node()">
  <xsl:copy>
    <xsl:apply-templates select="@*|node()"/>
  </xsl:copy>
</xsl:template>

<xsl:template match="doc">
 <html>
   <head>
     <title>
       <xsl:value-of select="title"/>
     </title>
   </head>
   <body>
     <xsl:apply-templates select="@*|node()"/>
   </body>
 </html>
</xsl:template>

<xsl:template match="doc/title">
  <h1>
    <xsl:apply-templates/>
  </h1>
</xsl:template>

<xsl:template match="chapter/title">
  <h2>
    <xsl:apply-templates/>
  </h2>
</xsl:template>

<xsl:template match="section/title">
  <h3>
    <xsl:apply-templates/>
  </h3>
</xsl:template>

<xsl:template match="act">
  <div class="leg-act">
    <xsl:apply-templates select="@*|node()"/>
  </div>
</xsl:template>

<xsl:template match="contents">
  <div class="leg-contents">
    <xsl:apply-templates select="@*|node()"/>
  </div>
</xsl:template>

<xsl:template match="title">
  <h2 class="leg-title">
    <xsl:apply-templates/>
  </h2>
</xsl:template>

<xsl:template match="assent">
  <dt class="leg-assent">Date of assent</dt>
  <dd><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="commencement">
  <dt class="leg-commencement">Commencement</dt>
  <dd><xsl:apply-templates/></dd>
</xsl:template>

<xsl:template match="contents/heading">
  <!-- <h3 class="leg-contents-heading"><xsl:apply-templates/></h3> -->
</xsl:template>

<xsl:template match="heading">
  <h3><xsl:apply-templates/></h3>
</xsl:template>

<!-- assign unique id to each para -->
<xsl:template match="para">
  <p class="para" id="{generate-id(@*)}">
    <xsl:apply-templates select="@*|node()"/>
  </p>
</xsl:template>

<xsl:template match="para">
  <p>
    <xsl:apply-templates/>
  </p>
</xsl:template>

<xsl:template match="citation">
  <span class="leg-citation">
    <xsl:apply-templates/>
  </span>
</xsl:template>

<!-- @TODO: need to extract value of extref.href and use in href -->
<xsl:template match="extref">
  <a class="leg-extref" href="#">
    <xsl:apply-templates/>
  </a>
</xsl:template>

<!-- @TODO: include meaning of amend.in, amend.?? -->
<xsl:template match="amend.in">
  <em class="leg-amend-in">
    <xsl:apply-templates/>
  </em>
</xsl:template>

<xsl:template match="date">
  <h4 class="leg-date">Date</h4>
  <xsl:apply-templates/>
</xsl:template>

<xsl:template match="description">
  <p class="leg-description"><xsl:apply-templates/></p>
</xsl:template>

<xsl:template match="label">
  <!-- <xsl:apply-templates/> -->
</xsl:template>

<xsl:template match="note">
  <p class="note">
    <b>NOTE: </b>
    <xsl:apply-templates/>
  </p>
</xsl:template>

<xsl:template match="emph">
  <em>
    <xsl:apply-templates/>
  </em>
</xsl:template>

</xsl:stylesheet>
