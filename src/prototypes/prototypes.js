(function () {
  var listEl = document.getElementById('prototype-list');
  var statusEl = document.getElementById('prototype-status');

  function setStatus(message) {
    if (statusEl) {
      statusEl.textContent = message;
    }
  }

  function toPrototypeHref(slug) {
    if (typeof slug !== 'string' || slug.trim() === '') {
      return '#';
    }

    return slug.endsWith('.html') ? './' + slug : './' + slug + '.html';
  }

  function renderPrototypes(prototypes) {
    if (!listEl) {
      return;
    }

    listEl.innerHTML = '';

    prototypes.forEach(function (prototype) {
      var card = document.createElement('article');
      card.className = 'card';

      var link = document.createElement('a');
      link.href = toPrototypeHref(prototype.slug);

      var title = document.createElement('strong');
      title.textContent = prototype.title || 'Untitled Prototype';

      var description = document.createElement('p');
      description.className = 'sub';
      description.textContent = prototype.description || 'No description yet.';

      var meta = document.createElement('small');
      meta.textContent = 'Status: ' + (prototype.status || 'unknown');

      link.appendChild(title);
      link.appendChild(description);
      link.appendChild(meta);
      card.appendChild(link);
      listEl.appendChild(card);
    });
  }

  fetch('./registry.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Failed to load registry.json (' + response.status + ')');
      }
      return response.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) {
        throw new Error('Registry format is invalid. Expected an array.');
      }

      renderPrototypes(data);
      setStatus('Loaded ' + data.length + ' prototype' + (data.length === 1 ? '' : 's') + '.');
    })
    .catch(function (error) {
      setStatus('Unable to load prototypes: ' + error.message);
    });
})();
