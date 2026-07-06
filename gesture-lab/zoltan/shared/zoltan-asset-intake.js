(function () {
  function key(file) {
    return [file.name, file.size, file.type, file.lastModified].join('|');
  }

  function createAssetFromFile(file, index) {
    const url = URL.createObjectURL(file);
    const isVideo = file.type && file.type.startsWith('video/');
    const asset = {
      id: key(file),
      type: isVideo ? 'video' : 'image',
      name: file.name.replace(/\.[^.]+$/, ''),
      title: file.name.replace(/\.[^.]+$/, ''),
      subtitle: isVideo ? 'Video subido' : 'Imagen subida',
      category: 'upload',
      tags: ['upload'],
      color: ['#d8ff3e', '#7dd3fc', '#ff466b', '#e8d8a8'][(index || 0) % 4],
      source: 'upload',
      file,
      url,
      el: null,
      ready: false,
      placeholder: false
    };
    if (isVideo) {
      const video = document.createElement('video');
      video.src = url;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.addEventListener('loadeddata', () => { asset.ready = true; });
      video.play().catch(() => {});
      asset.el = video;
    } else {
      const img = new Image();
      img.onload = () => { asset.ready = true; };
      img.src = url;
      asset.el = img;
    }
    return asset;
  }

  function revokeAsset(asset) {
    if (asset && asset.url && asset.source === 'upload') URL.revokeObjectURL(asset.url);
  }

  function revokeAssets(assets) {
    (assets || []).forEach(revokeAsset);
  }

  function createPlaceholderAsset(index, label) {
    return {
      id: `placeholder_${index + 1}`,
      type: 'placeholder',
      name: label || `Placeholder visible ${index + 1}`,
      title: label || `Placeholder visible ${index + 1}`,
      subtitle: 'Falta medio personalizado',
      category: 'placeholder',
      tags: ['placeholder'],
      color: ['#333', '#555', '#777'][index % 3],
      source: 'placeholder',
      url: '',
      el: null,
      ready: true,
      placeholder: true
    };
  }

  function validateAssetContract(mediaAssets, requiredCount, allowPlaceholders) {
    const uploadedCount = (mediaAssets || []).filter((asset) => asset && asset.source !== 'placeholder').length;
    const missingCount = Math.max(0, requiredCount - uploadedCount);
    const extraCount = Math.max(0, uploadedCount - requiredCount);
    const usingPlaceholders = missingCount > 0 && !!allowPlaceholders;
    let ok = true;
    let severity = 'ok';
    let message = `Medios cargados: ${uploadedCount}/${requiredCount}. Deck listo.`;
    if (uploadedCount === 0) {
      message = `Medios cargados: 0/${requiredCount}. Usando demo interna. Deck listo.`;
    }
    if (uploadedCount < requiredCount && uploadedCount > 0 && !allowPlaceholders) {
      ok = false;
      severity = 'error';
      message = `Medios cargados: ${uploadedCount}/${requiredCount}. Faltan ${missingCount} medios. Sube exactamente ${requiredCount} imagenes/videos o activa placeholders visibles.`;
    } else if (uploadedCount < requiredCount && uploadedCount > 0 && allowPlaceholders) {
      severity = 'warning';
      message = `Medios cargados: ${uploadedCount}/${requiredCount}. Placeholders activos: ${missingCount}.`;
    } else if (uploadedCount > requiredCount) {
      severity = 'warning';
      message = `Medios cargados: ${uploadedCount}/${requiredCount}. Has subido ${uploadedCount} medios. Se usaran los primeros ${requiredCount}.`;
    }
    return {
      ok,
      requiredCount,
      uploadedCount,
      usableCount: Math.min(uploadedCount, requiredCount),
      missingCount,
      extraCount,
      usingPlaceholders,
      message,
      severity
    };
  }

  function normalizeAssetsForDeck(filesOrAssets, requiredCount, allowPlaceholders) {
    const seen = new Set();
    const raw = Array.from(filesOrAssets || []);
    const assets = raw.map((item, index) => item instanceof File ? createAssetFromFile(item, index) : item)
      .filter((asset) => {
        const id = asset && (asset.id || asset.name);
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    const contract = validateAssetContract(assets, requiredCount, allowPlaceholders);
    const deckAssets = assets.slice(0, requiredCount);
    if (contract.usingPlaceholders) {
      while (deckAssets.length < requiredCount) deckAssets.push(createPlaceholderAsset(deckAssets.length));
    }
    return { assets, deckAssets, contract };
  }

  function getAssetStatusMessage(contract) {
    return contract ? contract.message : 'Estado de medios no disponible.';
  }

  window.ZoltanAssetIntake = {
    createAssetFromFile,
    revokeAsset,
    revokeAssets,
    validateAssetContract,
    createPlaceholderAsset,
    normalizeAssetsForDeck,
    getAssetStatusMessage
  };
})();
