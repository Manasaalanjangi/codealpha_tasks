
import { useState } from 'react';
import { Image, Smile, MapPin, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogTitle, 
  DialogHeader, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

type PostAddition = {
  type: 'photo' | 'feeling' | 'location' | 'event' | null;
  content: string;
};

export function CreatePost() {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addition, setAddition] = useState<PostAddition | null>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Post created",
        description: "Your post has been published successfully.",
      });
      setContent('');
      setAddition(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleAddition = (type: 'photo' | 'feeling' | 'location' | 'event', content: string) => {
    setAddition({ type, content });
  };

  const removeAddition = () => {
    setAddition(null);
  };

  const renderAdditionPreview = () => {
    if (!addition) return null;

    const iconMap = {
      photo: <Image className="h-4 w-4 text-social-blue" />,
      feeling: <Smile className="h-4 w-4 text-social-green" />,
      location: <MapPin className="h-4 w-4 text-social-orange" />,
      event: <Calendar className="h-4 w-4 text-social-purple" />
    };

    const labelMap = {
      photo: 'Added photo',
      feeling: 'Feeling',
      location: 'At',
      event: 'Event'
    };

    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md mb-3">
        {iconMap[addition.type]}
        <span className="text-sm">
          <span className="font-medium">{labelMap[addition.type]}:</span> {addition.content}
        </span>
        <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0" onClick={removeAddition}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="social-card p-4 mb-6">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage alt="Your profile picture" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind?"
            className="mb-3 resize-none min-h-[100px] focus-visible:ring-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {renderAdditionPreview()}
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full text-social-blue" type="button">
                    <Image className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:text-xs">Photo</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Photo</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Input type="file" accept="image/*" className="mb-4" />
                    <Input 
                      type="text" 
                      placeholder="Or enter an image URL"
                      className="mb-4"
                      onChange={(e) => handleAddition('photo', e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" type="button">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        onClick={() => handleAddition('photo', 'https://source.unsplash.com/random/800x600/?nature')}
                      >
                        Add Photo
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full text-social-green" type="button">
                    <Smile className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:text-xs">Feeling</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How are you feeling?</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-72 mt-2">
                    <div className="grid grid-cols-2 gap-2">
                      {['Happy', 'Excited', 'Grateful', 'Relaxed', 'Loved', 
                        'Hopeful', 'Motivated', 'Proud', 'Calm', 'Energetic',
                        'Tired', 'Sad', 'Anxious', 'Frustrated', 'Confused',
                        'Bored', 'Stressed', 'Overwhelmed'].map((feeling) => (
                        <Button
                          key={feeling}
                          variant="outline"
                          className="justify-start"
                          onClick={() => handleAddition('feeling', feeling)}
                        >
                          {feeling}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button variant="secondary" type="button">Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full text-social-orange" type="button">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:text-xs">Location</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Location</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Label htmlFor="location">Where are you?</Label>
                    <Input id="location" placeholder="Enter a location" className="mt-2" />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" type="button">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        onClick={() => handleAddition('location', 'San Francisco, CA')}
                      >
                        Add Location
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full text-social-purple" type="button">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only md:text-xs">Event</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <Label htmlFor="event-name">Event Name</Label>
                      <Input id="event-name" placeholder="Event name" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="event-date">Date</Label>
                      <Input id="event-date" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="event-time">Time</Label>
                      <Input id="event-time" type="time" className="mt-2" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" type="button">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        onClick={() => handleAddition('event', 'Community Meetup on Friday at 6 PM')}
                      >
                        Add Event
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Button 
              disabled={!content.trim() || isSubmitting}
              onClick={handleSubmit}
              className="px-4 py-2"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
