"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Namaste! I am your AgriSmart AI assistant. Ask me anything about irrigation, weather, or crop health. (I support English, Hindi, Marathi, Kannada)" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Based on your farm's data, I recommend waiting for tomorrow's scheduled irrigation rather than watering now. The soil moisture is currently at an acceptable level." }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">AI Agronomist Chat</h1>
        <p className="text-muted-foreground mt-1">
          24/7 intelligent support for your farming queries.
        </p>
      </div>

      <Card className="glass-card flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-3' : 'bg-secondary text-secondary-foreground mr-3'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none border border-border/50'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-3 border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <form onSubmit={handleSend} className="flex w-full space-x-2">
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Type your question..." 
              className="flex-1 border-border/50 bg-background/80"
            />
            <Button type="submit" size="icon" className="bg-primary shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
