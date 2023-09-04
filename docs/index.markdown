---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

# layout: home
---

# Jonathan's Notes on Various Things

Things I've worked on and might be useful for others.

<!-- Posts
- [Name of Link]({% post_url 2023-09-04-integrating-siri-with-octoprint %}) -->
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>