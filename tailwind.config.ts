
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced color palette with vivid gradients
				lbd: {
					pink: '#FF4B7F',
					purple: '#8A5EFF',
					cyan: '#36DBFF',
					dark: '#0A0A14',
					'dark-accent': '#1D1D2B',
					white: '#FFFFFF',
					gold: '#FFD700',
					neon: {
						pink: '#FF00FF',
						blue: '#00FFFF',
						green: '#39FF14',
						purple: '#9D00FF',
						yellow: '#FFFF00'
					}
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Outfit', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-shine': 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)',
				'cyber-grid': 'linear-gradient(rgba(50, 50, 70, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(50, 50, 70, 0.1) 1px, transparent 1px)',
				'neon-glow': 'linear-gradient(to right, #FF00FF, #00FFFF, #FF00FF)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(255, 75, 127, 0.7), 0 0 12px rgba(255, 75, 127, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 15px rgba(255, 75, 127, 0.9), 0 0 25px rgba(255, 75, 127, 0.5)'
					}
				},
				'blur-in': {
					'0%': {
						filter: 'blur(8px)',
						opacity: '0'
					},
					'100%': {
						filter: 'blur(0)',
						opacity: '1'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-500px 0'
					},
					'100%': {
						backgroundPosition: '500px 0'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						textShadow: '0 0 10px rgba(255, 75, 127, 0.8), 0 0 20px rgba(255, 75, 127, 0.5), 0 0 30px rgba(255, 75, 127, 0.3)'
					},
					'50%': {
						textShadow: '0 0 15px rgba(255, 75, 127, 1), 0 0 30px rgba(255, 75, 127, 0.8), 0 0 45px rgba(255, 75, 127, 0.6)'
					}
				},
				'hue-rotate': {
					'0%': {
						filter: 'hue-rotate(0deg)'
					},
					'100%': {
						filter: 'hue-rotate(360deg)'
					}
				},
				'morph': {
					'0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
					'25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
					'50%': { borderRadius: '50% 60% 50% 70% / 40% 40% 60% 50%' },
					'75%': { borderRadius: '40% 60% 70% 30% / 60% 30% 70% 40%' }
				},
				'neon-border-pulse': {
					'0%, 100%': {
						borderColor: 'rgba(255, 75, 127, 0.7)',
						boxShadow: '0 0 5px rgba(255, 75, 127, 0.7), 0 0 10px rgba(255, 75, 127, 0.5), inset 0 0 5px rgba(255, 75, 127, 0.2)'
					},
					'50%': {
						borderColor: 'rgba(54, 219, 255, 0.7)',
						boxShadow: '0 0 10px rgba(54, 219, 255, 0.7), 0 0 20px rgba(54, 219, 255, 0.5), inset 0 0 10px rgba(54, 219, 255, 0.2)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite',
				'blur-in': 'blur-in 0.5s ease-out',
				'shimmer': 'shimmer 2s linear infinite',
				'float': 'float 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'neon-pulse': 'neon-pulse 2s infinite',
				'hue-rotate': 'hue-rotate 10s linear infinite',
				'morph': 'morph 10s linear infinite',
				'neon-border-pulse': 'neon-border-pulse 4s infinite'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width',
				'backdrop': 'backdrop-filter'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

