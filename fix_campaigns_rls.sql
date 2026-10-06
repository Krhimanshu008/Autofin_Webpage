-- Add RLS Policies for campaigns to allow logged-in admin access
CREATE POLICY "Admin full access on campaigns"
ON campaigns FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
