var e=Object.defineProperty,n=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(t,o,i)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[o]=i;import{c as r,G as s,T as a,R as l,C as c,a as m,P as h,V as p,M as g,b as x,S as d,N as u}from"./vendor.409190d6.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&o(e)}).observe(document,{childList:!0,subtree:!0})}function o(e){var t,o;e.ep||(e.ep=!0,o={},(t=e).integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?o.credentials="include":"anonymous"===t.crossorigin?o.credentials="omit":o.credentials="same-origin",fetch(e.href,o))}}();const v="data:image/jpeg;base64,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";function A(e){return e*(.5-Math.random())}function M(e,t){return e+Math.random()*(t-e)}const w=r(Math.random);function f(e){return Math.max(0,Math.min(1,e))}const y="float PI = 3.141592653589793238;",U="\n#extension GL_OES_standard_derivatives : enable\nprecision highp float;\n\nuniform float time;\nuniform float progress;\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform vec4 resolution;\nvarying vec2 vUv;\n",E="\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute float offset;\nattribute vec3 bary;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float progress;\nuniform vec4 resolution;\n\nvarying vec2 vUv;\nvarying float vProgress;\nvarying float vProgress1;\nvarying vec3 vBary;\n",F="\nmat4 rotationMatrix(vec3 axis, float angle) {\n  axis = normalize(axis);\n  float s = sin(angle);\n  float c = cos(angle);\n  float oc = 1.0 - c;\n\n  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n              0.0,                                0.0,                                0.0,                                1.0);\n}\nvec3 rotate(vec3 v, vec3 axis, float angle) {\n  mat4 m = rotationMatrix(axis, angle);\n  return (m * vec4(v, 1.0)).xyz;\n}\n",G={dots:{uniforms:{},fragment:`
    ${U}
    const float SQRT_2 = 1.414213562373;
    const vec2 center = vec2(0, 0);// = vec2(0, 0);
    const float dots = 20.0;// = 20.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      bool nextImage = distance(fract(newUV * dots), vec2(0.5, 0.5)) < ( progress / distance(newUV, center));
      gl_FragColor = nextImage ? getToColor(newUV) : getFromColor(newUV);
    }

  `},flyeye:{uniforms:{},fragment:`
    ${U}
    const float size = 0.04; // = 0.04
    const float zoom = 100.0; // = 50.0
    const float colorSeparation = 0.3; // = 0.3

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float inv = 1. - progress;
      vec2 disp = size*vec2(cos(zoom*newUV.x), sin(zoom*newUV.y));
      vec4 texTo = getToColor(newUV + inv*disp);
      vec4 texFrom = vec4(
        getFromColor(newUV + progress*disp*(1.0 - colorSeparation)).r,
        getFromColor(newUV + progress*disp).g,
        getFromColor(newUV + progress*disp*(1.0 + colorSeparation)).b,
        1.0);
      gl_FragColor = texTo*progress + texFrom*inv;
    }

  `},"morph-x":{uniforms:{intensity:{value:1,type:"f",min:0,max:3}},fragment:`
  ${U}
  uniform float intensity;
  uniform sampler2D displacement;
  mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }
  const float PI = 3.1415;
  const float angle1 = PI *0.25;
  const float angle2 = -PI *0.75;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);
    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);
    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(t1, t2, progress);
  }
`},"morph-y":{uniforms:{intensity:{value:.3,type:"f",min:0,max:2}},fragment:`
  ${U}
  uniform float intensity;
  uniform sampler2D displacement;
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 d1 = texture2D(texture1, newUV);
    vec4 d2 = texture2D(texture2, newUV);
    float displace1 = (d1.r + d1.g + d1.b)*0.33;
    float displace2 = (d2.r + d2.g + d2.b)*0.33;

    vec4 t1 = texture2D(texture1, vec2(newUV.x, newUV.y + progress * (displace2 * intensity)));
    vec4 t2 = texture2D(texture2, vec2(newUV.x, newUV.y + (1.0 - progress) * (displace1 * intensity)));
    gl_FragColor = mix(t1, t2, progress);
  }
`},"page-curl":{uniforms:{},fragment:`
    ${U}
    const float MIN_AMOUNT = -0.16;
    const float MAX_AMOUNT = 1.5;

    const float PI = 3.141592653589793;

    const float scale = 512.0;
    const float sharpness = 3.0;

    const float cylinderRadius = 1.0 / PI / 2.0;

    vec4 getFromColor(vec2 p) {
      return texture2D(texture1, p);
    }

    vec4 getToColor(vec2 p) {
      return texture2D(texture2, p);
    }

    vec3 hitPoint(float hitAngle, float yc, vec3 point, mat3 rrotation) {
      float hitPoint = hitAngle / (2.0 * PI);
      point.y = hitPoint;
      return rrotation * point;
    }

    vec4 antiAlias(vec4 color1, vec4 color2, float distanc) {
      distanc *= scale;
      if(distanc < 0.0)
        return color2;
      if(distanc > 2.0)
        return color1;
      float dd = pow(1.0 - distanc / 2.0, sharpness);
      return ((color2 - color1) * dd) + color1;
    }

    float distanceToEdge(vec3 point) {
      float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
      float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
      if(point.x < 0.0)
        dx = -point.x;
      if(point.x > 1.0)
        dx = point.x - 1.0;
      if(point.y < 0.0)
        dy = -point.y;
      if(point.y > 1.0)
        dy = point.y - 1.0;
      if((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0))
        return sqrt(dx * dx + dy * dy);
      return min(dx, dy);
    }

    vec4 seeThrough(float yc, vec2 p, mat3 rotation, mat3 rrotation, float cylinderAngle) {
      float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
      vec3 point = hitPoint(hitAngle, yc, rotation * vec3(p, 1.0), rrotation);
      if(yc <= 0.0 && (point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0)) {
        return getToColor(p);
      }

      if(yc > 0.0)
        return getFromColor(p);

      vec4 color = getFromColor(point.xy);
      vec4 tcolor = vec4(0.0);

      return antiAlias(color, tcolor, distanceToEdge(point));
    }

    vec4 seeThroughWithShadow(float yc, vec2 p, vec3 point, mat3 rotation, mat3 rrotation, float cylinderAngle, float amount) {
      float shadow = distanceToEdge(point) * 30.0;
      shadow = (1.0 - shadow) / 3.0;

      if(shadow < 0.0)
        shadow = 0.0;
      else
        shadow *= amount;

      vec4 shadowColor = seeThrough(yc, p, rotation, rrotation, cylinderAngle);
      shadowColor.r -= shadow;
      shadowColor.g -= shadow;
      shadowColor.b -= shadow;

      return shadowColor;
    }

    vec4 backside(float yc, vec3 point) {
      vec4 color = getFromColor(point.xy);
      float gray = (color.r + color.b + color.g) / 15.0;
      gray += (8.0 / 10.0) * (pow(1.0 - abs(yc / cylinderRadius), 2.0 / 10.0) / 2.0 + (5.0 / 10.0));
      color.rgb = vec3(gray);
      return color;
    }

    vec4 behindSurface(vec2 p, float yc, vec3 point, mat3 rrotation, float cylinderAngle, float amount) {
      float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
      shado *= 1.0 - abs(point.x - 0.5);

      yc = (-cylinderRadius - cylinderRadius - yc);

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
      point = hitPoint(hitAngle, yc, point, rrotation);

      if(yc < 0.0 && point.x >= 0.0 && point.y >= 0.0 && point.x <= 1.0 && point.y <= 1.0 && (hitAngle < PI || amount > 0.5)) {
        shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / (71.0 / 100.0));
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
      } else {
        shado = 0.0;
      }
      return vec4(getToColor(p).rgb - shado, 1.0);
    }

    void main() {
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);

      float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
      float cylinderCenter = amount;
          // 360 degrees * amount
      float cylinderAngle = 2.0 * PI * amount;

      const float angle = 100.0 * PI / 180.0;
      float c = cos(-angle);
      float s = sin(-angle);

      mat3 rotation = mat3(c, s, 0, -s, c, 0, -0.801, 0.8900, 1);
      c = cos(angle);
      s = sin(angle);

      mat3 rrotation = mat3(c, s, 0, -s, c, 0, 0.98500, 0.985, 1);

      vec3 point = rotation * vec3(newUV, 1.0);

      float yc = point.y - cylinderCenter;

      if(yc < -cylinderRadius) {
                        // Behind surface
        gl_FragColor = behindSurface(newUV, yc, point, rrotation, cylinderAngle, amount);
        return;
      }

      if(yc > cylinderRadius) {
                        // Flat surface
        gl_FragColor = getFromColor(newUV);
        return;
      }

      float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;

      float hitAngleMod = mod(hitAngle, 2.0 * PI);
      if((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI / 2.0 && amount < 0.0)) {
        gl_FragColor = seeThrough(yc, newUV, rotation, rrotation, cylinderAngle);
        return;
      }

      point = hitPoint(hitAngle, yc, point, rrotation);

      if(point.x < 0.0 || point.y < 0.0 || point.x > 1.0 || point.y > 1.0) {
        gl_FragColor = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
        return;
      }

      vec4 color = backside(yc, point);

      vec4 otherColor;
      if(yc < 0.0) {
        float shado = 1.0 - (sqrt(pow(point.x - 0.5, 2.0) + pow(point.y - 0.5, 2.0)) / 0.71);
        shado *= pow(-yc / cylinderRadius, 3.0);
        shado *= 0.5;
        otherColor = vec4(0.0, 0.0, 0.0, shado);
      } else {
        otherColor = getFromColor(newUV);
      }

      color = antiAlias(color, otherColor, cylinderRadius - abs(yc));

      vec4 cl = seeThroughWithShadow(yc, newUV, point, rotation, rrotation, cylinderAngle, amount);
      float dist = distanceToEdge(point);

      gl_FragColor = antiAlias(color, cl, dist);
    }
  `},"peel-x":{uniforms:{},fragment:`
    ${U}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.x-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},"peel-y":{uniforms:{},fragment:`
    ${U}
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      float x = progress;
      x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
      vec4 f = mix(
        texture2D(texture1, (p-.5)*(1.-x)+.5),
        texture2D(texture2, (p-.5)*x+.5),
        x);
      gl_FragColor = f;
    }
  `},"polygons-fall":{uniforms:{},detail:12,offsetTop:0,vertex:`
    ${E}
    attribute vec3 centroid1;

    ${F}

    void main() {
      ${y}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float pr = (progress - 0.5) * (0. + resolution.y / resolution.x) + 0.5;
      pr = progress;
      float prog = clamp((pr - o * 0.9) / 0.1, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((pr - clamp(o - 0.1, 0., 1.) * 0.9) / 0.1, 0., 1.);
      newpos = rotate((newpos - centroid1), vec3(1., 0., 0.), -prog * PI) + centroid1 + vec3(0., -1., 0.) * prog * 0.;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${U}
    varying float vProgress;
    varying float vProgress1;
    ${y}
    varying vec3 vBary;

    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);
      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      gl_FragColor = vec4(t.rgb + .5 * color * vProgress1, opa);
    }
  `},"polygons-morph":{uniforms:{},detail:20,offsetTop:.4,vertex:`
    ${E}
    ${F}

    void main() {
      ${y}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.1, -0., 1.) * 0.9) / 0.1, 0., 1.);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${U}
    varying float vProgress;
    varying float vProgress1;
    ${y}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},"polygons-wind":{uniforms:{},detail:40,offsetTop:1,vertex:`
    ${E}
    attribute vec3 control0;
    attribute vec3 control1;

    ${F}

    float easeOut(float t){
      return  t * t * t;
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main() {
      ${y}
      vUv = uv;
      vBary = bary;

      vec3 newpos = position;

      float o = 1. - offset;
      float prog = clamp((progress - o * 0.6) / 0.4, 0., 1.);
      vProgress = prog;
      vProgress1 = clamp((progress - clamp(o - 0.2, -0., 1.) * 0.6) / 0.4, 0., 1.);
      newpos = bezier4(newpos, control0, control1, newpos, easeOut(prog));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
    }
  `,fragment:`
    ${U}
    varying float vProgress;
    varying float vProgress1;
    ${y}
    varying vec3 vBary;
    void main()	{
      float width = 2.5 * vProgress1;
      vec3 d;
      #ifdef GL_OES_standard_derivatives
        d = fwidth(vBary);
      #endif
      vec3 s = smoothstep(d * (width + 0.5), d * (width - 0.5), vBary);
      float alpha = max(max(s.x, s.y), s.z);
      vec3 color = vec3(alpha);

      vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
      vec4 t = texture2D(texture1, newUV);
      float opa = smoothstep(1., 0.5, vProgress);
      opa = 1. - vProgress;
      gl_FragColor = vec4(vUv, 0.0, opa);
      opa = smoothstep(0.5, 1., opa);
      gl_FragColor = vec4(t.rgb + 1. * color * vProgress1, opa);
    }
  `},pixelize:{uniforms:{},fragment:`
    ${U}
    ivec2 squaresMin = ivec2(50);
    int steps = 20;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float d = min(progress, 1.0 - progress);
      float dist = steps>0 ? ceil(d * float(steps)) / float(steps) : d;
      vec2 squareSize = 2.0 * dist / vec2(squaresMin);

      vec2 p = dist>0.0 ? (floor(newUV / squareSize) + 0.5) * squareSize : newUV;

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,p);
      vec4 t2 = texture2D(texture2,p);

      gl_FragColor = mix(t1, t2, progress);
    }
  `},ripple:{uniforms:{radius:{value:.9,type:"f",min:.1,max:2},width:{value:.35,type:"f",min:0,max:1}},fragment:`
    ${U}
    uniform float width;
    uniform float radius;
    uniform sampler2D displacement;
    float parabola( float x, float k ) {
      return pow( 4. * x * ( 1. - x ), k );
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
      vec2 p = newUV;
      vec2 start = vec2(0.5,0.5);
      vec2 aspect = resolution.wz;
      vec2 uv = newUV;
      float dt = parabola(progress, 1.);
      vec4 noise = texture2D(displacement, fract(vUv+time*0.04));
      float prog = progress*0.66 + noise.g * 0.04;
      float circ = 1. - smoothstep(-width, 0.0, radius * distance(start*aspect, uv*aspect) - prog*(1.+width));
      float intpl = pow(abs(circ), 1.);
      vec4 t1 = texture2D( texture1, (uv - 0.5) * (1.0 - intpl) + 0.5 ) ;
      vec4 t2 = texture2D( texture2, (uv - 0.5) * intpl + 0.5 );
      gl_FragColor = mix( t1, t2, intpl );
    }
  `},shutters:{uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${U}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = PI *0.25;

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 uvDivided = fract(newUV*vec2(intensity,1.));

      vec2 uvDisplaced1 = newUV + rotate(angle1)*uvDivided*progress*0.1;
      vec2 uvDisplaced2 = newUV + rotate(angle2)*uvDivided*(1. - progress)*0.1;

      vec4 t1 = texture2D(texture1,uvDisplaced1);
      vec4 t2 = texture2D(texture2,uvDisplaced2);

      gl_FragColor = mix(t1, t2, progress);
    }

  `},slices:{uniforms:{size:{value:.25,type:"f",min:.1,max:1}},fragment:`
    ${U}
    uniform float size; // = 0.2
    float count = 20.; // = 10.0
    float smoothness = .5; // = 0.5
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float pr = smoothstep(-smoothness, 0.0, newUV.x - progress * (1.0 + smoothness));
      float s = step(pr, fract(count * newUV.x));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, s);

    }
  `},squares:{uniforms:{},fragment:`
    ${U}
    ivec2 squares = ivec2(10,10);
    vec2 direction = vec2(1.0, -0.5);
    float smoothness = 1.6;

    const vec2 center = vec2(0.5, 0.5);
    void main() {
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      vec2 v = normalize(direction);
      v /= abs(v.x)+abs(v.y);
      float d = v.x * center.x + v.y * center.y;
      float offset = smoothness;
      float pr = smoothstep(-offset, 0.0, v.x * newUV.x + v.y * newUV.y - (d-0.5+progress*(1.+offset)));
      vec2 squarep = fract(newUV*vec2(squares));
      vec2 squaremin = vec2(pr/2.0);
      vec2 squaremax = vec2(1.0 - pr/2.0);
      float a = (1.0 - step(progress, 0.0)) * step(squaremin.x, squarep.x) * step(squaremin.y, squarep.y) * step(squarep.x, squaremax.x) * step(squarep.y, squaremax.y);

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,newUV);
      vec4 t2 = texture2D(texture2,newUV);

      gl_FragColor = mix(t1, t2, a);
    }
  `},stretch:{uniforms:{intensity:{value:50,type:"f",min:1,max:100}},fragment:`
    ${U}
    uniform float intensity;
    mat2 rotate(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }
    const float PI = 3.1415;
    const float angle1 = PI *0.25;
    const float angle2 = -PI *0.75;
    const float noiseSeed = 2.;
    float random() {
      return fract(sin(noiseSeed + dot(gl_FragCoord.xy / resolution.xy / 10.0, vec2(12.9898, 4.1414))) * 43758.5453);
    }
    float hash(float n) { return fract(sin(n) * 1e4); }
    float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
    float hnoise(vec2 x) {
      vec2 i = floor(x);
      vec2 f = fract(x);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float hn = hnoise(newUV.xy * resolution.xy / 100.0);
      vec2 d = vec2(0.,normalize(vec2(0.5,0.5) - newUV.xy).y);
      vec2 uv1 = newUV + d * progress / 5.0 * (1.0 + hn / 2.0);
      vec2 uv2 = newUV - d * (1.0 - progress) / 5.0 * (1.0 + hn / 2.0);
      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, progress);
    }
  `},"wave-x":{uniforms:{},fragment:`
  ${U}
  uniform sampler2D displacement;
  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }
  void main()	{
    vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 noise = texture2D(displacement, mirrored(newUV+time*0.04));
    float prog = (1.0 - progress)*0.8 -0.05 + noise.g * 0.06;
    float intpl = pow(abs(smoothstep(0., 1., (prog*2. - vUv.x + 0.5))), 10.);

    vec4 t1 = texture2D( texture2, (newUV - 0.5) * (1.0 - intpl) + 0.5 ) ;
    vec4 t2 = texture2D( texture1, (newUV - 0.5) * intpl + 0.5 );
    gl_FragColor = mix( t1, t2, intpl );
  }
  `},wind:{uniforms:{},fragment:`
    ${U}
    float size = 0.2;

    float rand (vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main()	{
      vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

      float r = rand(vec2(0, newUV.y));
      float m = smoothstep(0.0, -size, newUV.x*(1.0-size) + size*r - ((progress) * (1.0 + size)));

      vec2 uv1 = newUV;
      vec2 uv2 = newUV;

      vec4 t1 = texture2D(texture1,uv1);
      vec4 t2 = texture2D(texture2,uv2);
      gl_FragColor = mix(t1, t2, m);

    }
  `}},C="\nattribute vec2 uv;\nattribute vec3 position;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",R=(t,e)=>{var{shaderPerSlide:e,swiper:o}=e,o=o.params.loop?o.realIndex:o.activeIndex;let i=G;if(Array.isArray(t)&&t.length){if(e)return void 0===t[o]?G[t[0]]:G[t[o]];i={},Object.keys(G).forEach(e=>{t.includes(e)&&(i[e]=G[e])})}e=Math.floor(Math.random()*Object.keys(i).length);return i[Object.keys(i)[e]]};class K{constructor(e){var t="random"===e.shader||Array.isArray(e.shader)?R(e.shader,e):G[e.shader];this.shader=t,this.displacement=e.displacementMap||v,this.scene=new a,this.swiper=e.swiper,this.vertex=t.vertex||C,this.fragment=t.fragment,this.uniforms=t.uniforms||{},this.renderer=new l({dpr:2,webgl:2,alpha:!0}),this.gl=this.renderer.gl,this.width=window.innerWidth,this.height=window.innerHeight,this.renderer.setSize(this.width,this.height),this.gl.clearColor(1,1,1,0),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.opts=e,this.container=this.swiper.el,this.displacementTexture=null,this.width=this.swiper.width,this.height=this.swiper.height,this.swiper.isElement&&this.gl.canvas.setAttribute("slot","container-start"),this.container.prepend(this.gl.canvas),this.camera=new c(this.gl,{fov:45}),this.camera.perspective({aspect:this.gl.canvas.width/this.gl.canvas.height}),this.camera.position.set(0,0,2),this.time=0,this.current=0,this.init(()=>{this.addObjects(),this.resize(),this.render()})}animateUniform(o,i,r){const s=o.value;let a,n=null;window.cancelAnimationFrame(this.animateUniformFrame);const l=i>o.value?"next":"prev",c=(e,t)=>"next"===l&&t<=e||"prev"===l&&e<=t,m=()=>{if(!this.destroyed){a=(new Date).getTime(),null===n&&(n=a);var t=Math.max(Math.min((a-n)/this.swiper.params.speed,1),0),t=.5-Math.cos(t*Math.PI)/2;let e=s+t*(i-s);c(e,i)&&(e=i),o.value=e,c(e,i)?(cancelAnimationFrame(this.animateUniformFrame),r&&r()):this.animateUniformFrame=requestAnimationFrame(m)}};m()}loadTextures(){const t=[],s=this;return this.images=[],this.textures=[],this.container.querySelectorAll(".swiper-gl-image").forEach(e=>{this.images.push(e.src)}),this.images.forEach((i,r)=>{var e=new Promise(e=>{const t=new Image,o=(t.crossOrigin="anonymous",new m(this.gl));t.onload=()=>{o.image=t,s.textures[r]=o,e()},t.src=i});t.push(e)}),t.push(new Promise(e=>{const t=new Image,o=(t.crossOrigin="anonymous",new m(this.gl));t.onload=()=>{o.image=t,s.displacementTexture=o,e()},t.src=v})),Promise.all(t)}init(e){this.loadTextures().then(()=>{this.initialized=!0,this.onInit&&this.onInit(),e()})}resize(){if(this.initialized&&!this.destroyed){var{width:o,height:i}=this.swiper,r=(this.width=o,this.height=i,this.renderer.setSize(o,i),this.camera.position.z);if(this.camera.perspective({aspect:o/i,fov:180/Math.PI*2*Math.atan(1/(2*r))}),this.textures[0].image){r=this.textures[0].image.height/this.textures[0].image.width;let e,t;t=r<i/o?(e=o/i*r,1):(e=1,i/o/r),this.material.uniforms.resolution.value.x=o,this.material.uniforms.resolution.value.y=i,this.material.uniforms.resolution.value.z=e,this.material.uniforms.resolution.value.w=t,this.shader.vertex&&this.vertexMaterial&&(this.vertexMaterial.uniforms.resolution.value.x=o,this.vertexMaterial.uniforms.resolution.value.y=i,this.vertexMaterial.uniforms.resolution.value.z=e,this.vertexMaterial.uniforms.resolution.value.w=t),this.shader.vertex?(this.nextMesh.scale.set(this.camera.aspect/2,.5,.5),this.currentMesh.scale.set(this.camera.aspect/2,.5,.5)):(this.plane.scale.x=this.camera.aspect,this.plane.scale.y=1)}}}createMaterial(){return new h(this.gl,((e,r)=>{for(var s in r=r||{})t.call(r,s)&&i(e,s,r[s]);if(n)for(var s of n(r))o.call(r,s)&&i(e,s,r[s]);return e})({extensions:{derivatives:"#extension GL_OES_standard_derivatives : enable"},uniforms:{time:{type:"f",value:0},progress:{type:"f",value:0},intensity:{type:"f",value:0},width:{type:"f",value:0},radius:{type:"f",value:0},size:{type:"f",value:0},texture1:{type:"f",value:this.textures[0]},texture2:{type:"f",value:this.textures[1]},displacement:{type:"f",value:this.displacementTexture},resolution:{type:"v4",value:new p}},vertex:this.shader.vertex||C,fragment:this.shader.fragment},this.shader.vertex?{transparent:!0,depthWrite:!1}:{}))}addObjects(){var e,t;this.scene.children.forEach(e=>{this.scene.removeChild(e)}),this.scene.children.forEach(e=>{this.scene.removeChild(e)}),this.material=this.createMaterial(),(this.shader.vertex?(e=function(e,o,i){i=i||0;const r=o,a=2/r,n=a*Math.sqrt(3)/2,l=2/n,c=[],m=[],h=[],p=[],g=[],x=[],d=[];var v,u,y=[];for(let t=0;t<l;t+=1){u=t*n,v=t%2==1?-a/2:0;for(let e=0;e<=r;e+=1){const r=Math.sign(e*a+v-1);m.push(e*a+v-1,u-1,0),d.push((e*a+v)/2,u/2),m.push(e*a+a/2+v-1,n+u-1,0),d.push((e*a+a/2+v)/2,(n+u)/2),m.push(e*a-a/2+v-1,n+u-1,0),d.push((e*a-a/2+v)/2,(n+u)/2);var U=f(u/2+2*(w(e/l,t/l)+Math.random())/o),E=Math.random(),U=(c.push(U,f(U+.1*i),f(U+.1*i)),x.push(E,E,E),[e*a+v-1,u-1,0]),U=(h.push(...U,...U,...U),[2*r*M(-.3,.3),-2*M(-.3,.3)*1.5,-A(.5)]),G=[2*r*M(.3,.6),-2*M(.3,.6)*1.5,-A(.5)],F=(p.push(...U,...U,...U),g.push(...G,...G,...G),y.push(0,0,1,0,1,0,1,0,0),m.push(e*a+v-1,u-1,0),d.push((e*a+v)/2,u/2),m.push(e*a+a+v-1,u-1,0),d.push((e*a+a+v)/2,u/2),m.push(e*a+a/2+v-1,n+u-1,0),d.push((e*a+a/2+v)/2,(n+u)/2),f(u/2+2*(w((e+1)/l,t/l)+Math.random())/o)),E=Math.random(),F=(c.push(F,F,f(F+.1*i)),x.push(E,E,E),[e*a+v-1,u-1,0]);p.push(...U,...U,...U),g.push(...G,...G,...G),h.push(...F,...F,...F),y.push(0,0,1,0,1,0,1,0,0)}}e=new s(e);return e.addAttribute("position",{size:3,data:new Float32Array(m)}),e.addAttribute("bary",{size:3,data:new Float32Array(y)}),e.addAttribute("uv",{size:2,data:new Float32Array(d)}),e.addAttribute("offset",{size:1,data:new Float32Array(c)}),e.addAttribute("centroid1",{size:3,data:new Float32Array(h)}),e.addAttribute("control0",{size:3,data:new Float32Array(p)}),e.addAttribute("control1",{size:3,data:new Float32Array(g)}),e.addAttribute("random",{size:1,data:new Float32Array(x)}),e}(this.gl,this.shader.detail,this.shader.offsetTop),t=this.textures[1],this.vertexMaterial=this.createMaterial(),this.vertexMaterial.uniforms.texture1.value=t,this.currentMesh=new g(this.gl,{geometry:e,program:this.material}),this.nextMesh=new g(this.gl,{geometry:e,program:this.vertexMaterial}),this.nextMesh.position.z=-1e-4,this.currentMesh.setParent(this.scene),this.nextMesh):(t=new x(this.gl,{width:1,height:1,widthSegments:2,heightSegments:2}),this.plane=new g(this.gl,{geometry:t,program:this.material}),this.plane)).setParent(this.scene)}replaceShader(e){let t,o;o=(this.shader.vertex?(t=this.material.uniforms.texture1.value,this.vertexMaterial.uniforms.texture1):(t=this.material.uniforms.texture1.value,this.material.uniforms.texture2)).value;var i="random"===e||Array.isArray(e)?R(e,this.opts):G[e],{fragment:r,uniforms:s,vertex:a}=i;this.shader=i,this.vertex=a||C,this.fragment=r||"",this.uniforms=s||{},this.addObjects(),this.shader.vertex?(this.material.uniforms.texture1.value=o,this.vertexMaterial.uniforms.texture1.value=o):(this.material.uniforms.texture1.value=t,this.material.uniforms.texture2.value=o,this.material.uniforms.progress.value=1),this.resize(),this.swiper.params.gl.shader=e}replaceRandomShader(){var e=R(this.opts.shader,this.opts),{fragment:t,uniforms:o,vertex:i}=e;this.shader=e,this.fragment=t||"",this.uniforms=o||{},this.vertex=i||C,this.addObjects(),this.resize()}setProgress(e,t,o,i){if(!this.destroyed)if(this.initialized){this.swiper.params.loop&&(e=parseInt(this.swiper.slides[e].getAttribute("data-swiper-slide-index"),10),t=parseInt(this.swiper.slides[t].getAttribute("data-swiper-slide-index"),10));const r=this.textures[t],s=this.textures[e];this.material.uniforms.texture1.value=s,this.shader.vertex?this.vertexMaterial.uniforms.texture1.value=r:this.material.uniforms.texture2.value=r,i?(0===o&&0===this.material.uniforms.progress.value&&(this.material.uniforms.progress.value=1),1===o&&1===this.material.uniforms.progress.value&&(this.material.uniforms.progress.value=0),this.animateUniform(this.material.uniforms.progress,o,()=>{"random"!==this.swiper.params.gl.shader&&!Array.isArray(this.swiper.params.gl.shader)||(this.replaceRandomShader(),this.material.uniforms.texture1.value=s,this.material.uniforms.texture2.value=r,this.material.uniforms.progress.value=o),1===o&&(this.material.uniforms.texture1.value=r),this.material.uniforms.progress.value=0})):this.material.uniforms.progress.value=Math.abs(o)}else this.onInit=()=>{requestAnimationFrame(()=>{this.setProgress(e,t,o,i)})}}render(){this.swiper.destroyed||this.destroyed||(this.time+=.05,this.material.uniforms.time.value=this.time,Object.keys(this.uniforms).forEach(e=>{this.material.uniforms[e].value=this.uniforms[e].value}),requestAnimationFrame(this.render.bind(this)),this.renderer.render({scene:this.scene,camera:this.camera}))}destroy(){this.initialized=!1,this.destroyed=!0,this.gl&&this.gl.canvas&&this.container.removeChild(this.gl.canvas)}}var demoShadderCurrent=document.querySelector(".demo-shader-current").innerText;"undefined"!=typeof window&&window.SwiperElementRegisterParams&&window.SwiperElementRegisterParams(["gl"]);const Y=new d(".swiper",{modules:[u,function({swiper:s,on:e,extendParams:t}){s.gl=null;let o=!1;t({gl:{shader:"random",shaderPerSlide:!1,displacementMap:void 0}});const a=()=>{s.gl=new K({debug:!0,swiper:s,shader:s.params.gl.shader,shaderPerSlide:s.params.gl.shaderPerSlide})};let n,l;e("beforeInit",()=>{var e;"gl"===s.params.effect&&(!function(){try{var e=document.createElement("canvas");return window.WebGLRenderingContext&&(e.getContext("webgl")||e.getContext("experimental-webgl"))}catch(e){}}()?o=!0:(s.classNames.push(s.params.containerModifierClass+"gl"),e={watchSlidesProgress:!0},Object.assign(s.params,e),Object.assign(s.originalParams,e)))}),e("init",()=>{"gl"!==s.params.effect||o||s.gl||a()}),e("resize",()=>{"gl"!==s.params.effect||o||s.gl.resize()}),e("setTranslate",()=>{if("gl"===s.params.effect&&!o){let o,i,r;s.gl||a(),s.slides.forEach((e,t)=>{e=e.progress;(0<e&&e<1||0===e&&s.progress<l)&&(o=t,i=t+1,r=e),(e<0&&-1<e||0===e&&s.progress>l)&&(o=t-1,i=t,r=1+e)}),l=s.progress||0,void 0===o&&void 0===i||s.gl.setProgress(o,i,r,n)}}),e("setTransition",(e,t)=>{"gl"!==s.params.effect||o||(n=0<t&&!s.params.cssMode)}),e("slidesGridLengthChange",()=>{"gl"===s.params.effect&&!o&&s.initialized&&s.gl&&s.gl.loadTextures&&s.gl.loadTextures()}),e("destroy",()=>{"gl"!==s.params.effect||o||s.gl&&(s.gl.destroy(),s.gl=null)})}],speed:1e3,effect:"gl",autoplay:!0,loop:!0,gl:{shader:demoShadderCurrent},navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"}}),I=document.querySelector(".demo-shader-picker"),T=document.querySelector(".demo-shader-options");document.querySelector(".demo-shader-selector").addEventListener("click",()=>{T.style.display="none"!==T.style.display&&T.style.display?"none":"block"}),T.addEventListener("click",e=>{"SPAN"===e.target.nodeName&&(e=e.target.textContent.trim(),document.querySelector(".demo-shader-current").textContent=e,Y.gl.replaceShader(e),T.style.display="none")}),document.addEventListener("click",e=>{I.contains(e.target)||(T.style.display="none")});