export const INITIAL_TICKETS = [
  {
    id: "TCK-4891",
    customer: {
      name: "Aarav Sharma",
      email: "aarav.sharma@razorpay.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      company: "Razorpay Payments Pvt Ltd",
      plan: "Enterprise",
      phone: "+91 98201 44810",
      timezone: "IST (UTC+5:30)",
      location: "Bengaluru, Karnataka"
    },
    subject: "Critical: UPI Autopay webhook failing on HDFC & ICICI recurring mandates",
    description: "Our automated monthly subscription UPI autopay webhooks are timing out for HDFC/ICICI bank handles. Over 65 recurring mandates failed since 09:30 AM IST today. Customers are getting retry error SMS.",
    priority: "High",
    status: "Open",
    category: "Payment Gateway & UPI",
    createdAt: "2026-09-22T13:30:00Z",
    updatedAt: "2026-09-22T14:15:00Z",
    assignedTo: {
      name: "Harsh Vardhan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Lead Payment Operations"
    },
    tags: ["UPI", "Autopay", "Razorpay", "HDFC", "Urgent"],
    conversation: [
      {
        id: "msg-1",
        sender: "customer",
        senderName: "Aarav Sharma",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T13:30:00Z",
        content: "Hi Support Team, we are seeing high failure rates on NPCI / UPI recurring autopay webhooks for our merchant portal. Could you please check if the webhook endpoint is throttled or if NPCI gateway latency is spiking?"
      },
      {
        id: "msg-2",
        sender: "agent",
        senderName: "Harsh Vardhan",
        senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T13:55:00Z",
        content: "Namaste Aarav! I am actively looking into the webhook delivery logs for Razorpay merchant ID `RZP_MERC_9941`. NPCI reported a minor queue latency spike for HDFC handles between 13:00-13:40 IST. We have enabled auto-retry with exponential backoff."
      },
      {
        id: "msg-3",
        sender: "customer",
        senderName: "Aarav Sharma",
        senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T14:15:00Z",
        content: "Thanks Harsh! The retry queue is clearing up now. Please keep this ticket open until evening batch settles."
      }
    ]
  },
  {
    id: "TCK-4890",
    customer: {
      name: "Priya Patel",
      email: "priya.patel@swiggy.in",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      company: "Swiggy Bundl Technologies",
      plan: "Enterprise",
      phone: "+91 99880 12345",
      timezone: "IST (UTC+5:30)",
      location: "Bengaluru, Karnataka"
    },
    subject: "GST B2B E-Invoicing JSON IRN generation error code 2150",
    description: "When generating e-invoices with GSTIN 29AABCS1429B1ZB via the API, the NIC portal returns 'Duplicate IRN request or Invalid Seller HSN format'.",
    priority: "High",
    status: "In Progress",
    category: "Billing & GST Compliance",
    createdAt: "2026-09-22T11:15:00Z",
    updatedAt: "2026-09-22T12:40:00Z",
    assignedTo: {
      name: "Aman Saxena",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Tax & Compliance Lead"
    },
    tags: ["GST", "E-Invoice", "IRN", "Compliance"],
    conversation: [
      {
        id: "msg-4",
        sender: "customer",
        senderName: "Priya Patel",
        senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T11:15:00Z",
        content: "Hello Team, our monthly bulk vendor settlement of ₹4.2 Crores requires valid IRN QR codes by 5 PM today for audit clearance. The API keeps returning code 2150."
      },
      {
        id: "msg-5",
        sender: "agent",
        senderName: "Aman Saxena",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T12:20:00Z",
        content: "Hi Priya, we analyzed the payload. The 6-digit SAC code was formatted as string with trailing spaces: `'998311 '`. Removing the whitespace resolved the NIC schema validation. I have pushed a sanitizer patch."
      }
    ]
  },
  {
    id: "TCK-4889",
    customer: {
      name: "Rohan Verma",
      email: "rohan.verma@zerodha.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      company: "Zerodha Broking Limited",
      plan: "Enterprise",
      phone: "+91 98450 78901",
      timezone: "IST (UTC+5:30)",
      location: "Bengaluru, Karnataka"
    },
    subject: "Kite Connect WebSocket ticker disconnection during high volatility market open",
    description: "During 09:15-09:30 AM market opening bell, Nifty 50 option chain tick streaming socket dropped connections for 1,200 concurrent active traders.",
    priority: "High",
    status: "In Progress",
    category: "Real-time WebSockets & API",
    createdAt: "2026-09-21T03:45:00Z",
    updatedAt: "2026-09-22T08:15:00Z",
    assignedTo: {
      name: "Harsh Vardhan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Backend Architect"
    },
    tags: ["WebSockets", "Trading", "NSE", "High Volume"],
    conversation: [
      {
        id: "msg-6",
        sender: "customer",
        senderName: "Rohan Verma",
        senderAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-21T03:45:00Z",
        content: "Hi team, our algorithmic trading desks reported socket disconnects right at NSE market opening. Can we scale up our dedicated socket cluster in Mumbai AWS ap-south-1?"
      },
      {
        id: "msg-7",
        sender: "agent",
        senderName: "Harsh Vardhan",
        senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-22T08:15:00Z",
        content: "Hello Rohan, we have scaled your dedicated socket broker cluster to 8 pods with automatic redis pub/sub load balancing in Mumbai (ap-south-1). Latency is currently stable under 12ms."
      }
    ]
  },
  {
    id: "TCK-4888",
    customer: {
      name: "Ananya Iyer",
      email: "ananya.iyer@freshworks.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      company: "Freshworks Technologies",
      plan: "Pro",
      phone: "+91 94440 55678",
      timezone: "IST (UTC+5:30)",
      location: "Chennai, Tamil Nadu"
    },
    subject: "Custom domain CNAME SSL handshake failure for support.freshworks-partner.in",
    description: "Let's Encrypt auto-renewal failed for our custom support portal domain. Chrome throws SSL_ERROR_BAD_CERT_DOMAIN.",
    priority: "Medium",
    status: "Open",
    category: "Domain & SSL Security",
    createdAt: "2026-09-21T10:20:00Z",
    updatedAt: "2026-09-21T10:20:00Z",
    assignedTo: {
      name: "Kavita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "DevOps Engineer"
    },
    tags: ["SSL", "CNAME", "DNS", "Security"],
    conversation: [
      {
        id: "msg-8",
        sender: "customer",
        senderName: "Ananya Iyer",
        senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-21T10:20:00Z",
        content: "Customers accessing our partner portal are getting SSL warnings. We checked Cloudflare DNS and CAA records match. Please re-issue SSL certificate."
      }
    ]
  },
  {
    id: "TCK-4887",
    customer: {
      name: "Vikram Malhotra",
      email: "vikram.m@zomato.com",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      company: "Zomato Media Pvt Ltd",
      plan: "Enterprise",
      phone: "+91 98110 99887",
      timezone: "IST (UTC+5:30)",
      location: "Gurugram, Haryana"
    },
    subject: "SMS OTP delivery latency on Jio and Airtel DLT route",
    description: "Customer onboarding OTP messages were delayed by 4-6 minutes for Delhi-NCR numbers during dinner peak rush (8 PM - 10 PM).",
    priority: "Medium",
    status: "Resolved",
    category: "Telecom & DLT SMS",
    createdAt: "2026-09-20T14:00:00Z",
    updatedAt: "2026-09-21T06:30:00Z",
    assignedTo: {
      name: "Aman Saxena",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Telecom Integration Specialist"
    },
    tags: ["OTP", "DLT", "SMS", "TRAI", "Jio", "Airtel"],
    conversation: [
      {
        id: "msg-9",
        sender: "customer",
        senderName: "Vikram Malhotra",
        senderAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-20T14:00:00Z",
        content: "Hi team, we received customer complaints regarding late OTP arrival for login verification. Are our DLT template IDs configured with priority failover routing across backup SMS gateways?"
      },
      {
        id: "msg-10",
        sender: "agent",
        senderName: "Aman Saxena",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-20T17:00:00Z",
        content: "Hello Vikram, we identified that our primary telco partner had an optic fiber disruption in North Circle. We have rerouted your DLT PE-ID `110155234000` via our secondary Airtel & Jio direct SMPP pipes."
      },
      {
        id: "msg-11",
        sender: "customer",
        senderName: "Vikram Malhotra",
        senderAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-21T06:30:00Z",
        content: "Average OTP delivery latency dropped to 1.8 seconds across all telecom circles. Issue resolved, thank you!"
      }
    ]
  },
  {
    id: "TCK-4886",
    customer: {
      name: "Neha Reddy",
      email: "neha.reddy@flipkart.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      company: "Flipkart Internet Pvt Ltd",
      plan: "Enterprise",
      phone: "+91 97400 33445",
      timezone: "IST (UTC+5:30)",
      location: "Bengaluru, Karnataka"
    },
    subject: "Big Billion Day load readiness: Request 20,000 req/sec API quota boost",
    description: "Preparing our inventory sync pipelines for upcoming festive season sale. We require dedicated autoscaling limits and guaranteed 99.99% uptime SLA.",
    priority: "High",
    status: "In Progress",
    category: "Infrastructure & Capacity",
    createdAt: "2026-09-20T04:30:00Z",
    updatedAt: "2026-09-21T11:10:00Z",
    assignedTo: {
      name: "Harsh Vardhan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Principal Architect"
    },
    tags: ["BigBillionDays", "Load Testing", "Capacity", "Scale"],
    conversation: [
      {
        id: "msg-12",
        sender: "customer",
        senderName: "Neha Reddy",
        senderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-20T04:30:00Z",
        content: "Hi Harsh & Team, our performance testing team is conducting stress tests this Friday at 15k RPS. Please provision pre-warmed NLBs and dedicated Redis cache clusters."
      },
      {
        id: "msg-13",
        sender: "agent",
        senderName: "Harsh Vardhan",
        senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-21T11:10:00Z",
        content: "Namaste Neha! We have pre-scaled your dedicated VPC tenant with 16 AWS c6i.4xlarge compute instances and 25k RPS capacity. We will also monitor the mock stress test live on Friday."
      }
    ]
  },
  {
    id: "TCK-4885",
    customer: {
      name: "Rahul Gupta",
      email: "rahul.gupta@paytm.com",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      company: "One97 Communications (Paytm)",
      plan: "Enterprise",
      phone: "+91 99100 88776",
      timezone: "IST (UTC+5:30)",
      location: "Noida, Uttar Pradesh"
    },
    subject: "Aadhaar e-KYC DigiLocker verification webhook callback intermittent 504",
    description: "During merchant onboarding KYC uploads, DigiLocker token exchange is returning gateway timeout for documents over 5MB.",
    priority: "High",
    status: "Open",
    category: "KYC & Identity Verification",
    createdAt: "2026-09-19T09:10:00Z",
    updatedAt: "2026-09-19T10:45:00Z",
    assignedTo: {
      name: "Kavita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "Security & KYC Lead"
    },
    tags: ["DigiLocker", "KYC", "Aadhaar", "Timeout"],
    conversation: [
      {
        id: "msg-14",
        sender: "customer",
        senderName: "Rahul Gupta",
        senderAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-19T09:10:00Z",
        content: "Around 12% of new QR merchants are getting stuck on the DigiLocker redirect page when uploading PAN + Aadhaar PDFs."
      }
    ]
  },
  {
    id: "TCK-4884",
    customer: {
      name: "Sneha Mukherjee",
      email: "sneha.m@tcs.com",
      avatar: "https://images.unsplash.com/photo-1534751516642-a171ed80633b?w=150&auto=format&fit=crop&q=80",
      company: "Tata Consultancy Services (TCS)",
      plan: "Enterprise",
      phone: "+91 98300 11223",
      timezone: "IST (UTC+5:30)",
      location: "Kolkata, West Bengal"
    },
    subject: "Request quarterly TDS Section 194J Form 16A credit certificate verification",
    description: "Please provide the quarterly Form 16A TDS certificate for Q1 FY 2026-27 for our corporate accounts reconciliation.",
    priority: "Low",
    status: "Resolved",
    category: "Tax & Finance Compliance",
    createdAt: "2026-09-19T06:20:00Z",
    updatedAt: "2026-09-19T11:00:00Z",
    assignedTo: {
      name: "Aman Saxena",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Accounts & Tax Specialist"
    },
    tags: ["TDS", "Form16A", "Finance", "Tax"],
    conversation: [
      {
        id: "msg-15",
        sender: "customer",
        senderName: "Sneha Mukherjee",
        senderAvatar: "https://images.unsplash.com/photo-1534751516642-a171ed80633b?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-19T06:20:00Z",
        content: "Hi finance desk, please share the signed TRACES Form 16A PDF for PAN AAACT1234F."
      },
      {
        id: "msg-16",
        sender: "agent",
        senderName: "Aman Saxena",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-19T11:00:00Z",
        content: "Hi Sneha, the digital TRACES Form 16A certificate has been uploaded to your Billing Portal under Tax Documents."
      }
    ]
  },
  {
    id: "TCK-4883",
    customer: {
      name: "Rajesh Singhania",
      email: "rajesh.s@tatadigital.com",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
      company: "Tata Digital (Tata Neu)",
      plan: "Enterprise",
      phone: "+91 98210 66778",
      timezone: "IST (UTC+5:30)",
      location: "Mumbai, Maharashtra"
    },
    subject: "NeuCoins loyalty rewards redemption API synchronization delay",
    description: "During checkout on partner apps (1mg, BigBasket, Croma), NeuCoins balance takes up to 45 seconds to reflect after order placement.",
    priority: "Medium",
    status: "In Progress",
    category: "Loyalty & Points API",
    createdAt: "2026-09-18T12:00:00Z",
    updatedAt: "2026-09-19T09:20:00Z",
    assignedTo: {
      name: "Harsh Vardhan",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Lead Systems Architect"
    },
    tags: ["TataNeu", "NeuCoins", "Loyalty", "Redis", "Sync"],
    conversation: [
      {
        id: "msg-17",
        sender: "customer",
        senderName: "Rajesh Singhania",
        senderAvatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-18T12:00:00Z",
        content: "Hi Harsh, we noticed cache invalidation delay between the NeuPass wallet and Croma POS terminal checkouts."
      },
      {
        id: "msg-18",
        sender: "agent",
        senderName: "Harsh Vardhan",
        senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-19T09:20:00Z",
        content: "Namaste Rajesh, we updated the Kafka topic consumer group with parallel partitions. Cache invalidation latency is now down to ~200ms."
      }
    ]
  },
  {
    id: "TCK-4882",
    customer: {
      name: "Divya Nair",
      email: "divya.nair@infosys.com",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
      company: "Infosys Limited",
      plan: "Enterprise",
      phone: "+91 94470 99881",
      timezone: "IST (UTC+5:30)",
      location: "Thiruvananthapuram, Kerala"
    },
    subject: "Azure AD SSO multi-factor authentication conditional access configuration",
    description: "Need guidance on configuring SAML 2.0 conditional access policies for our offshore development center (ODC) developers in Pune and Mysore.",
    priority: "Medium",
    status: "Open",
    category: "SSO & Identity Access",
    createdAt: "2026-09-18T05:15:00Z",
    updatedAt: "2026-09-18T05:15:00Z",
    assignedTo: {
      name: "Kavita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "Security Engineer"
    },
    tags: ["AzureAD", "SAML", "SSO", "Enterprise"],
    conversation: [
      {
        id: "msg-19",
        sender: "customer",
        senderName: "Divya Nair",
        senderAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-18T05:15:00Z",
        content: "We need IP-range whitelisting mapped to our Microsoft Entra ID enterprise app. Can we schedule a 15-minute sync with your security engineer?"
      }
    ]
  },
  {
    id: "TCK-4881",
    customer: {
      name: "Aditya Joshi",
      email: "aditya.joshi@cred.club",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      company: "CRED (Dreamplug Technologies)",
      plan: "Pro",
      phone: "+91 99200 44556",
      timezone: "IST (UTC+5:30)",
      location: "Mumbai, Maharashtra"
    },
    subject: "Bharat BillPay (BBPS) electricity and utility bill status reconciliation mismatch",
    description: "Certain BESCOM and MSEDCL bill payment callbacks are marked 'PENDING' for > 24 hours instead of auto-reconciling.",
    priority: "Low",
    status: "In Progress",
    category: "BBPS & Utilities",
    createdAt: "2026-09-17T11:40:00Z",
    updatedAt: "2026-09-18T06:00:00Z",
    assignedTo: {
      name: "Aman Saxena",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "BBPS Integration Specialist"
    },
    tags: ["BBPS", "NPCI", "Utility", "BESCOM"],
    conversation: [
      {
        id: "msg-20",
        sender: "customer",
        senderName: "Aditya Joshi",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-17T11:40:00Z",
        content: "We need an automated T+1 auto-polling cron for NPCI BBPS biller status checks to reduce manual customer tickets."
      },
      {
        id: "msg-21",
        sender: "agent",
        senderName: "Aman Saxena",
        senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-18T06:00:00Z",
        content: "Hi Aditya, we have enabled hourly BBPS status query sync for all Karnataka (BESCOM) and Maharashtra (MSEDCL) billers."
      }
    ]
  },
  {
    id: "TCK-4880",
    customer: {
      name: "Pooja Mehra",
      email: "pooja.mehra@meesho.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      company: "Meesho Fashnear Technologies",
      plan: "Pro",
      phone: "+91 97110 55443",
      timezone: "IST (UTC+5:30)",
      location: "Bengaluru, Karnataka"
    },
    subject: "Regional language support: Hindi and Tamil notification push templates",
    description: "Need to verify UTF-8 Devanagari (हिन्दी) and Tamil (தமிழ்) font rendering in delivery update WhatsApp push notifications.",
    priority: "Low",
    status: "Resolved",
    category: "Localization & WhatsApp API",
    createdAt: "2026-09-16T04:20:00Z",
    updatedAt: "2026-09-17T08:00:00Z",
    assignedTo: {
      name: "Kavita Deshmukh",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "Frontend & Localization Lead"
    },
    tags: ["WhatsApp", "Hindi", "Tamil", "i18n", "Regional"],
    conversation: [
      {
        id: "msg-22",
        sender: "customer",
        senderName: "Pooja Mehra",
        senderAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-16T04:20:00Z",
        content: "Namaste team, Meta WhatsApp template approval for Hindi regional order dispatch notifications requires proper unicode encoding."
      },
      {
        id: "msg-23",
        sender: "agent",
        senderName: "Kavita Deshmukh",
        senderAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
        timestamp: "2026-09-17T08:00:00Z",
        content: "Namaste Pooja! We updated the Meta Business API payload serializer with full UTF-8 BOM encoding. All Hindi and Tamil templates are approved and active."
      }
    ]
  }
];
