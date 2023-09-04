---
layout: default
title:  "Integrating Siri with Octoprint"
date:   2023-09-04 11:31:10 -0700
categories: automation
---

# Integrating Siri with OctoPrint

## Getting the status of the current print job

The method I'm using is to make a Shortcut, which can be triggered by siri, which itself runs an http request. Here's an example of how this looks like. Note that under `Show More` of `Get contents of`, the http method or headers can be set (like `X-Api-Key`, which is needed to authenticate when calling octoprint's API[^octoprint-auth]). The `Show` block serves to make siri read the response out loud.

[^octoprint-auth]: [https://docs.octoprint.org/en/master/api/index.html](https://docs.octoprint.org/en/master/api/index.html)

![Shortcut for http request](/assets/shortcut_http.png)

Since I'm interacting with this through siri, just dumping out the json for siri to read is not going to be useful. So instead, I will collect information from the json received from the octoprint API[^octoprint-job] to form a formatted string for siri to read. This formatting could be done with shortcuts, but it gets messy fast so instead I will write an http server to sit between the shortcut and the octoprint API which does the formatting work. 

The shortcut then simply connects to this server, which itself sends requests to the octoprint API. I called the shortcut `get print status`, and then I can simply say: `Hey Siri, get print status`, to which siri responds with `Finished printing CE3PRO_Basic On-Ramp.gcode. Printing took 2 hours and 30 minutes`.

Notes: While the octoprint API docs don't seem say this, I've found that in practice many fields in the returned json can be null, so code has to be prepared to deal with that.

My interface server: [https://github.com/hydrogen602/printer-interface-to-shortcuts](https://github.com/hydrogen602/printer-interface-to-shortcuts). I've included a few other commands too.

[^octoprint-job]: [https://docs.octoprint.org/en/master/api/job.html#get--api-job](https://docs.octoprint.org/en/master/api/job.html#get--api-job)
