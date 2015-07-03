Legolas
=======

_Make legislation a conversation._

## Concept

A builder sees the walls of your kitchen as something mutable. Citizens should see law as something they can engage and be active stakeholders in.

As programmers, the idea of "law as code" is appealing, because we perceive software as mutable.

As open source / open society thinkers, the idea of law as a legal code repository which members of society may contribute to is appealing because it leads to engaged democracy.

In the media, law is commonly represented as a rigid narrative (eg to "break the law" holds moral weight) and changes to law are reduced to a minimal phrase (pick your topic, but "anti-smacking bill" seems a fine example) which polarises people rather than involving them in an active & informed debate around the societal rules they want to share.

The aim of this project is to take the legislative process in NZ and make it an engaged conversation amongst citizens.

## Process

As a first step, we're building on prior works to import NZ's legislation from http://legislation.govt.nz data feed.

 * https://github.com/Br3nda/legislation_pull
 * https://github.com/wombleton/gitlaw-nz/

We seek to add to that *potential law*. This includes -

 * Bills before the house, exposing laws in the process of consideration
 * Proposed bills, exposing laws which may become law if they are selected from ballot
 * Proposals from the wider population, allowing any citizen to put forth their ideas

@TODO need to understand this much better to argue for it.

From there, we want to build a platform which supports nuanced conversation around all of this, ...

And letting people propose changes to law (fork & pull-req model, but without the developer terminology).

## Technical

* Import all the laws
 * Start with a subset (2015 public acts)
 * Pull in the PDFs because they show how it oughta
 * Pull in the XMLs and make 'em look fine
 * Support the comments
* Fork & Pull
 * As CMS

## Methodology

...

## FAQ

### Why "legolas"?

OK look I just thought of a word that started with "leg", it's just a placeholder.
