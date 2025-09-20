import Link from 'next/link'
import { Upload, Palette, Download, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ColorEditor</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            See Your Colors on 
            <span className="text-blue-600"> Real Designs</span> Instantly
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop guessing with abstract color palettes. Upload your actual design, 
            click any color, and see changes in real-time. No more switching between tools.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Link 
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Start Editing Colors
            </Link>
            <Link 
              href="/dashboard"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
            >
              Try Demo
            </Link>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Any Design</h3>
              <p className="text-gray-600">
                PNG, JPG, or any image format. See changes on your actual designs, not generic templates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Preview</h3>
              <p className="text-gray-600">
                Click any color, pick a replacement, and see instant changes. No waiting, no guessing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Export Instantly</h3>
              <p className="text-gray-600">
                Download your edited design immediately. High-quality PNG output ready for production.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Problem/Solution Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Stop Wasting Time with Abstract Color Tools
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">❌ Current Workflow</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Browse endless color palettes on Coolors</li>
                  <li>• Guess how colors will look on your design</li>
                  <li>• Switch between multiple tools</li>
                  <li>• Manually apply colors one by one</li>
                  <li>• Repeat until you get it right</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">✅ With ColorEditor</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Upload your actual design file</li>
                  <li>• Click any color to select it</li>
                  <li>• See instant real-time changes</li>
                  <li>• Download the edited design</li>
                  <li>• Done in under 1 minute</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Speed Up Your Design Workflow?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of designers who are already editing colors faster with real-time preview.
          </p>
          <Link 
            href="/auth/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="h-6 w-6" />
            <span className="text-lg font-semibold">ColorEditor</span>
          </div>
          <p className="text-gray-400">
            The fastest way to edit colors on real designs
          </p>
        </div>
      </footer>
    </div>
  )
}
