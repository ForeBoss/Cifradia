/*
 * Cal.com embed bootstrap.
 * Cargado ANTES del bundle React para que embed.js se descargue
 * y evalúe exactamente una vez por carga de página.
 * @calcom/embed-react detecta window.Cal existente y omite su propia
 * inyección de <script>, evitando "cal-modal-box already used" / "Cal is not defined"
 * cuando el init de React se ejecuta más de una vez.
 */
(function (C, A, L) {
  var p = function (a, ar) { a.q.push(ar); };
  var d = C.document;
  C.Cal = C.Cal || function () {
    var cal = C.Cal, ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      var api = function () { p(api, arguments); };
      var namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else { p(cal, ar); }
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

// Dispara la descarga única de embed.js de inmediato para que esté
// lista cuando React monte. El init del namespace por defecto es un shim;
// el "init" por instancia lo emite <Cal namespace=…> después.
window.Cal("init", { origin: "https://cal.com" });
