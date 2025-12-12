"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqsList = [
  {
    question: "What is HealthifyMe?",
    answer:
      "HealthifyMe is an AI-powered symptom checker that provides preliminary health analysis based on the symptoms you provide. It is for informational purposes only and is not a substitute for professional medical advice.",
  },
  {
    question: "Is the analysis a medical diagnosis?",
    answer:
      "No. The information provided by HealthifyMe is not a medical diagnosis. It is intended for educational and awareness purposes only. You should always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health.",
  },
  {
    question: "How accurate is the AI?",
    answer:
      "Our AI is trained on a vast amount of medical data to provide likely conditions based on your symptoms. However, it cannot replace the expertise and judgment of a human doctor who can perform a physical examination and consider your full medical history.",
  },
  {
    question: "What should I do if I have a medical emergency?",
    answer:
      "If you are experiencing a medical emergency, please call your local emergency services immediately or go to the nearest hospital. Do not rely on this tool for emergency situations.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We take your privacy seriously. Your data is processed securely, and we do not store any personal health information you provide. All analyses are performed anonymously."
  }
];

export function FAQs() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqsList.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="text-lg font-semibold text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
