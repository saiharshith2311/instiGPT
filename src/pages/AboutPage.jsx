import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faBolt, faShield, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-16">
        
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="w-16 h-16 rounded-2xl bg-input flex items-center justify-center mx-auto mb-5">
            <FontAwesomeIcon icon={faRobot} className="text-2xl text-icon" />
          </div>
          <h1 className="text-3xl font-bold text-text tracking-tight mb-3">InstiGPT</h1>
          <p className="text-muted text-base leading-relaxed">
            An AI assistant built for the IIT Madras community. Ask anything about 
            campus life, academics, clubs, placements, and more.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-14">
          {[
            {
              icon: faBolt,
              title: 'Fast & Smart',
              desc: 'Powered by Llama 3.3 70B via Groq — one of the fastest AI models available.'
            },
            {
              icon: faGraduationCap,
              title: 'IITM Focused',
              desc: 'Trained to answer questions specific to IIT Madras — hostels, mess, clubs, academics, placements.'
            },
            {
              icon: faShield,
              title: 'Private',
              desc: 'Chat history is stored locally on your device. Nothing is sent to any server except the AI.'
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="w-9 h-9 rounded-lg bg-input flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={item.icon} className="text-sm text-icon" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text mb-1">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Built by */}
        <div className="text-center border-t border-border pt-8">
          <p className="text-sm text-muted">
            Built By <span className="text-text font-medium">IIT Madras WebOps</span> 
            
          </p>
        </div>
      </div>
    </div>
  )
}
