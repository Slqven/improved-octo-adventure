// Custom shader for gravitational lensing effect during black hole scene
export const GravityDistortionShader = {
    uniforms: {
        tDiffuse: { value: null },
        center: { value: [0.5, 0.5] },
        strength: { value: 0.0 },
        radius: { value: 0.3 }
    },

    vertexShader: `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 center;
        uniform float strength;
        uniform float radius;
        varying vec2 vUv;
        
        void main() {
            vec2 toCenter = vUv - center;
            float dist = length(toCenter);
            
            // Gravitational lensing distortion
            float distortion = 0.0;
            if (dist < radius) {
                distortion = strength * (1.0 - dist / radius) * (1.0 - dist / radius);
            }
            
            vec2 distortedUv = vUv + normalize(toCenter) * distortion;
            
            // Add chromatic aberration for realism
            float aberration = distortion * 0.01;
            vec4 color;
            color.r = texture2D(tDiffuse, distortedUv + vec2(aberration, 0.0)).r;
            color.g = texture2D(tDiffuse, distortedUv).g;
            color.b = texture2D(tDiffuse, distortedUv - vec2(aberration, 0.0)).b;
            color.a = 1.0;
            
            // Darken center (event horizon)
            float darkness = smoothstep(radius * 0.3, 0.0, dist);
            color.rgb *= (1.0 - darkness * 0.9);
            
            gl_FragColor = color;
        }
    `
};
