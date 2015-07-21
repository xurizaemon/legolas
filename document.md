# xsl document format

Reading through a document to understand the format better ... with a mind to writing a proper XSL stylesheet, then we can output better formats (eg .md and .html).

Need to compare this doc with the current HTML output from parliament.govt.nz to get a good concept of how they mark it up, what they do and don't include in final output, and what we can do to structure it well for discussion.

## act

attributes: date.instructed, id, instructing.office, irdnumbering, xml:lang, year.imprint, act.no, act.type, date.as.at, date.assent, date.terminated, date.first.valid, hard.copy.reprint, strage, year, description, sonz, terminated, prospective.consolidation, prospective.consolidation.based.on, prospective.consolidation.base.version

## cover

attributes: id

containers: title, assent, commencement

### title

text

### assent

contains a date

### commencement

text

## contents

containers: heading, toc, front, enactment

tags: toc

### toc

placeholder?

## body

attributes: id, prov-type

containers: prov

### prov

containers: label, heading, prov.body

#### label

text

#### heading

text

#### prov.body

containers: subprov

##### subprov

containers: label, para

###### label

attributes: auto.number (bool), denominator (bool)

###### text

text!
