function a0_0x3cc5(_0x421680, _0x2b9637) {
  const _0x1f3400 = a0_0x1f34();
  return (
    (a0_0x3cc5 = function (_0x3cc5ee, _0x24fbd5) {
      _0x3cc5ee = _0x3cc5ee - 0x67;
      let _0x857ec5 = _0x1f3400[_0x3cc5ee];
      return _0x857ec5;
    }),
    a0_0x3cc5(_0x421680, _0x2b9637)
  );
}
function a0_0x1f34() {
  const _0x2c434b = [
    "252CZaheF",
    "interstitial",
    "appendChild",
    "preloadAd",
    "SDK_READY",
    "getElementById",
    "main.min.js",
    "head",
    "gdsdk",
    "32orPPSw",
    "__adErrorCallback",
    "showAd",
    "6523860rYNztj",
    "catch",
    "26PKEzED",
    "getElementsByTagName",
    "769430WJgYhg",
    "script",
    "2315781lSopnm",
    "resumeAll",
    "audioEngine",
    "41284CBXHgz",
    "51ab7839879343d98d3b7cbc7164843f",
    "SDK_GAME_START",
    "8wjDodn",
    "10959831WDBLZA",
    "967417LhkILQ",
    "rewarded",
    "232141oytLYE",
    "24PlQzYq",
    "GD_OPTIONS",
    "onload",
    "name",
    "__adFinishedCallback",
  ];
  a0_0x1f34 = function () {
    return _0x2c434b;
  };
  return a0_0x1f34();
}
const a0_0x63cc7b = a0_0x3cc5;
(function (_0x40692d, _0x1b4f87) {
  const _0x381b71 = a0_0x3cc5,
    _0x5e1c8e = _0x40692d();
  while (!![]) {
    try {
      const _0x1c66f2 =
        (-parseInt(_0x381b71(0x70)) / 0x1) *
          (-parseInt(_0x381b71(0x69)) / 0x2) +
        -parseInt(_0x381b71(0x6d)) / 0x3 +
        (-parseInt(_0x381b71(0x86)) / 0x4) * (parseInt(_0x381b71(0x6b)) / 0x5) +
        (parseInt(_0x381b71(0x78)) / 0x6) * (-parseInt(_0x381b71(0x77)) / 0x7) +
        (-parseInt(_0x381b71(0x73)) / 0x8) *
          (-parseInt(_0x381b71(0x74)) / 0x9) +
        -parseInt(_0x381b71(0x67)) / 0xa +
        (parseInt(_0x381b71(0x75)) / 0xb) * (parseInt(_0x381b71(0x7d)) / 0xc);
      if (_0x1c66f2 === _0x1b4f87) break;
      else _0x5e1c8e["push"](_0x5e1c8e["shift"]());
    } catch (_0x1d82dd) {
      _0x5e1c8e["push"](_0x5e1c8e["shift"]());
    }
  }
})(a0_0x1f34, 0xc68e5);
let requesting = ![],
  watched = ![],
  complate = null;
(window["createVideoAd"] = (_0x13ba80, _0x5bcb60) => {
  const _0x55358b = a0_0x3cc5,
    _0x406b18 = () => {
      const _0x44e66a = a0_0x3cc5;
      return (
        window[_0x44e66a(0x87)] && window["__adErrorCallback"](),
        (window["__adErrorCallback"] = null),
        (window["__adFinishedCallback"] = null),
        _0x13ba80 && _0x13ba80()
      );
    };
  if (!window[_0x55358b(0x85)]) return _0x406b18();
  if (requesting) return _0x406b18();
  (requesting = !![]),
    _0x13ba80
      ? ((watched = !![]),
        (complate = _0x13ba80),
        gdsdk["showAd"](_0x5bcb60 ? _0x55358b(0x76) : _0x55358b(0x7e))["catch"](
          () => {
            const _0x236e62 = _0x55358b;
            _0x13ba80 && _0x13ba80(),
              (window["__adFinishedCallback"] = null),
              (window[_0x236e62(0x87)] = null),
              (requesting = ![]);
          }
        ))
      : ((complate = null),
        (watched = ![]),
        gdsdk[_0x55358b(0x88)](_0x55358b(0x76))[_0x55358b(0x68)](() => {
          const _0x410bbb = _0x55358b;
          window[_0x410bbb(0x87)] && window[_0x410bbb(0x87)](),
            (window[_0x410bbb(0x7c)] = null),
            (window[_0x410bbb(0x87)] = null),
            (requesting = ![]);
        }));
}),
  (window[a0_0x63cc7b(0x79)] = {
    gameId: a0_0x63cc7b(0x71),
    onEvent: function (_0xc67160) {
      const _0x9f4e91 = a0_0x63cc7b;
      console["log"](_0xc67160["name"]);
      switch (_0xc67160[_0x9f4e91(0x7b)]) {
        case _0x9f4e91(0x81):
          gdsdk[_0x9f4e91(0x80)]("interstitial"),
            gdsdk["preloadAd"](_0x9f4e91(0x76));
          break;
        case _0x9f4e91(0x72):
          (requesting = ![]), cc["audioEngine"][_0x9f4e91(0x6e)]();
          watched
            ? (window[_0x9f4e91(0x7c)] && window[_0x9f4e91(0x7c)](),
              (window[_0x9f4e91(0x7c)] = null),
              (window[_0x9f4e91(0x87)] = null))
            : (window["__adErrorCallback"] && window["__adErrorCallback"](),
              (window[_0x9f4e91(0x7c)] = null),
              (window[_0x9f4e91(0x87)] = null));
          complate && complate();
          break;
        case "SDK_GAME_PAUSE":
          cc[_0x9f4e91(0x6f)]["pauseAll"]();
          break;
        case "SDK_REWARDED_WATCH_COMPLETE":
          watched = !![];
          break;
      }
    },
  }),
  (function (_0x5462da, _0x1d1adf, _0x36ee2f) {
    const _0x4c413b = a0_0x63cc7b;
    var _0x2a0b89,
      _0x4ed3f7 = _0x5462da[_0x4c413b(0x6a)](_0x1d1adf)[0x0];
    if (_0x5462da[_0x4c413b(0x82)](_0x36ee2f)) return;
    (_0x2a0b89 = _0x5462da["createElement"](_0x1d1adf)),
      (_0x2a0b89["id"] = _0x36ee2f),
      (_0x2a0b89["src"] = _0x4c413b(0x83)),
      (_0x2a0b89[_0x4c413b(0x7a)] = () => {}),
      _0x5462da[_0x4c413b(0x84)][_0x4c413b(0x7f)](_0x2a0b89);
  })(document, a0_0x63cc7b(0x6c), "gamedistribution-jssdk");
